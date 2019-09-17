import seedrandom from "seedrandom";

interface Definition {
    variables: Variable[];
    result: {
        value: (values: number[]) => number;
        weight: (result: number) => number;
    };
}

interface Variable {
    min: number,
    max: number,
    weight: (value: number, result: number) => number
}

interface Result {
    values: number[],
    result: number,
    difficulty: number,
}

const solve = (definition: Definition, targetDifficulty: number, seed = "hello world") => {
    seedrandom(seed, { global: true })

    const initialValues = generateInitialValues(definition.variables);
    const initialResult = definition.result.value(initialValues);

    return gradientDescent(
        definition, targetDifficulty, getResult(definition, targetDifficulty, initialValues, initialResult));
}

const gradientDescent = (definition: Definition, targetDifficulty: number, initialNode: Result) => {
    let currentNode = initialNode;
    for (let i = 0; i < 100; i++) {
        const candidateNode = getBestNeighbour(definition, targetDifficulty, currentNode, 2);

        if (candidateNode) {
            currentNode = candidateNode;
        } else {
            return currentNode;
        }
    }
    return currentNode;
}

const generateInitialValues = (variables: Variable[]) =>
    variables.map((variable) => Math.round(variable.min + (variable.max - variable.min) * Math.random()));

const getBestNeighbour = (definition: Definition, targetDifficulty: number, currentNode: Result, learningRate: number) => {
    const currentValues = currentNode.values;

    for (let i = 0; i < currentNode.values.length; i++) {
        for (let j = 0; j <= 1; j++) {
            const operation = j === 0 ? learningRate : -learningRate;

            const newValue = currentValues[i] + operation;

            if (newValue < definition.variables[i].min || newValue > definition.variables[i].max) {
                continue;
            }

            const newValues = [
                ...currentValues.slice(0, i),
                newValue,
                ...currentValues.slice(i + 1),
            ]

            const candidateNode = getResult(definition, targetDifficulty, newValues, definition.result.value(newValues));

            if (candidateNode.difficulty < currentNode.difficulty) {
                return candidateNode;
            }
        }
    }

    return undefined;
}

const getResult = (definition: Definition, targetDifficulty: number, values: number[], result: number): Result => {
    const valueDifficulty = values.reduce((acc, value, i) => acc + definition.variables[i].weight(value, result), 0);
    const returnDifficulty = definition.result.weight(result);

    return {
        values,
        result,
        difficulty: Math.abs(targetDifficulty - (valueDifficulty + returnDifficulty)),
    };
}

const definition: Definition = {

    variables: [
        {
            min: 0,
            max: 100,
            weight: () => 0,
        },
        {
            min: 0,
            max: 100,
            weight: () => 0,
        }
    ],
    result: {
        value: (values) => values[0] + values[1],
        weight: (result) => result,
    }
}

const resultNode = solve(definition, 57, "hellow");

console.log(resultNode);