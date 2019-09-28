import seedrandom from 'seedrandom';

/**
 * Defines the variables and the difficulty function for
 * the math problem generation algorithm
 */
export interface Definition {
    variables: Variable[];
    score: (values: number[]) => number;
}

/**
 * A variable is specified by its domain
 */
interface Variable {
    min: number;
    max: number;
}

/**
 * Output of math problem generation algorithm, resulting values and corresponding difficulty
 */
export interface Result {
    values: number[];
    score: number;
}

/**
 * Math problem generation algorithm. Accepts a list of variables with a defined domain and a difficulty
 * function, and assigns values to variables to match the specified difficulty value.
 * @param definition specifies the variables to solve for and the difficulty function to use
 * @param targetDifficulty the target difficulty to optimize for
 * @param seed optional - seed used when requiring random values
 * @return a Result object with values for each variable and the resulting difficulty
 */
export const selectBestAssignment = (definition: Definition, seed = 'seed') => {
    seedrandom(seed, { global: true });

    // Initial values are randomly assigned inside the domain space
    const initialValues = generateInitialValues(definition.variables);

    // Use gradient descent to find the optimal solution
    return gradientDescent(definition, initialValues);
};

const gradientDescent = (variables: Definition, initialValues: number[]) => {
    // How fast should we converge to a solution
    // Higher values reduce the runtime, but could lead to lower accuracy
    const learningRate = 3;

    // Number of iterations before we return the best set of values we found so far
    const count = 10000;

    // Prime the successor and result generator function with the provided parameters
    const successor = generateSuccessor(variables, learningRate);
    const generateNode = getResult(variables);

    // We will be keeping the best set of values we found so far here
    let bestNode = generateNode(initialValues);

    let currentNode = bestNode;
    for (let i = 0; i < count; i++) {
        // Get a random neighbour to our current node
        const candidateValues = successor(currentNode.values);

        // Determine the difficulty delta of our candidate
        const candidateNode = generateNode(candidateValues);

        // Select which node to accept next as our current node
        currentNode = selectSuccessor(count - i, currentNode, candidateNode);

        // Check if our current node has a lower difficulty delta than the best node so far
        if (bestNode.score > currentNode.score) {
            bestNode = currentNode;

            // If the delta is 0, then return it, we can't do better than that
            if (bestNode.score === 0) {
                return bestNode;
            }
        }
    }
    return bestNode;
};

/**
 * Generate a random set of values, used as a starting point for gradient descent
 * @param variables an array of variables and their domains
 */
const generateInitialValues = (variables: Variable[]) =>
    variables.map(variable =>
        Math.round(variable.min + (variable.max - variable.min) * Math.random())
    );

/**
 * Generate a neighbour node to our current one
 * @param definition variable definition
 * @param learningRate how much of a change we should have between neighbour nodes
 */
const generateSuccessor = (definition: Definition, learningRate: number) => (
    currentValue: number[]
): number[] => {
    const whichNeighbour = Math.round(
        (definition.variables.length - 1) * Math.random()
    );

    let nextValue;
    if (
        currentValue[whichNeighbour] - learningRate <=
        definition.variables[whichNeighbour].min
    ) {
        nextValue = currentValue[whichNeighbour] += learningRate;
    } else if (
        currentValue[whichNeighbour] + learningRate >=
        definition.variables[whichNeighbour].max
    ) {
        nextValue = currentValue[whichNeighbour] -= learningRate;
    } else {
        const whichOperation = Math.round(Math.random());
        const operation = whichOperation === 0 ? learningRate : -learningRate;

        nextValue = currentValue[whichNeighbour] + operation;
    }

    return [
        ...currentValue.slice(0, whichNeighbour),
        nextValue,
        ...currentValue.slice(whichNeighbour + 1),
    ];
};

/**
 * Determine the best node to choose next, following the simulated annealing algorithm.
 *
 * Three possibilities:
 * 1. Candidate node is a better choice than current node
 * then we select the candidate node
 * 2. Candidate node is a worst choice and
 * a. we determine by Math.random() that we should select it
 * then we select the candidate node
 * b. we determine by Math.random that we should not select it
 * then we select the current node
 *
 * We use this approach to ensure we do not get stuck in a local minima of our difficulty function. The likelihood
 * of us choosing a worst candidate is determined by the system's temperature. A lower temperate reduces the likelihood
 * of us choosing a worst candidate. As the gradient process goes on, the temperature decreases, ensuring we ultimately
 * find a good candidate.
 *
 * @param temperature current "temperature" the system, used as part of the simulated annealing process
 * @param currentNode
 * @param candidateNode
 */
const selectSuccessor = (
    temperature: number,
    currentNode: Result,
    candidateNode: Result
) => {
    if (currentNode.score > candidateNode.score) {
        return candidateNode;
    } else {
        const P = 1 - Math.exp(-1 / (0.001 * temperature));
        const p = Math.random();
        if (p > P) {
            return candidateNode;
        } else {
            return currentNode;
        }
    }
};

/**
 * Calculate the difference (delta) of the current difficulty of the specified values, and the target
 * difficulty.
 * @param definition
 */
const getResult = (definition: Definition) => (values: number[]) => {
    const score = definition.score(values);

    return {
        values,
        score,
    };
};
