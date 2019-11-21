import {
    ArithmeticProblemTemplateModel,
    IArithmeticProblemDefinition,
    IArithmeticProblemTemplate,
} from '@server/database/arithmeticProblemTemplate';
import {
    IProblem,
    ProblemDifficulty,
    ProblemType,
} from '@shared/models/problem';
import Boom from 'boom';
import {
    generateIncorrectWholeNumberSolutions,
    generateNumber,
    generateIncorrectWholeNumberSolutionsWithRemainder,
} from './generateNumbers';

/**
 * Generates a problem of types Addition, Subtraction, Multiplication or
 * Division
 *
 * @param difficulty difficulty tier of the problem type
 * @param problemType problem type generate for
 */
export async function generateArithmeticProblem(
    difficulty: ProblemDifficulty,
    problemType: ProblemType,
): Promise<IProblem> {
    // NOTE: expecatation that difficulty and problemType are valiated before this function call
    const template = await ArithmeticProblemTemplateModel.findOne({
        problemType: problemType.valueOf(),
    });

    if (template) {
        const problemDefinition = template.difficultyMap.get(
            difficulty.valueOf(),
        );

        if (problemDefinition) {
            const operands = generateOperands(
                difficulty,
                problemDefinition,
                problemType,
            );

            const result = computeArithmeticResult(operands, template.operator);

            const solution = createSolutionArray(
                difficulty,
                operands,
                problemType,
                result,
            );

            // generate incorrect solutions for multiple choice
            const incorrectSolutions = generateIncorrectSolutions(
                difficulty,
                problemDefinition.multiplesOf,
                operands,
                problemType,
                result,
            );

            // construct problem string, ex: "1 + 2 ="
            const problem = createProblemStatement(operands, template.operator);

            return {
                incorrectSolutions,
                operands,
                operators: [template.operator],
                problem,
                problemType,
                solution,
            } as IProblem;
        } else {
            throw Boom.notFound(
                'no problem definition found for:' +
                    problemType.valueOf() +
                    ', ' +
                    difficulty.valueOf(),
            );
        }
    } else {
        throw Boom.notFound('no template found for: ' + problemType.valueOf());
    }
}

/**
 * Generates the operands for a given problem type and difficulty
 *
 * @param difficulty difficulty of the problem
 * @param problemDefinition definition of the problem
 * @param problemType problem type
 */
function generateOperands(
    difficulty: ProblemDifficulty,
    problemDefinition: IArithmeticProblemDefinition,
    problemType: ProblemType,
): number[] {
    switch (problemType) {
        case ProblemType.ADDITION:
        case ProblemType.MULTIPLICATION: {
            return generateAdditionOrMultiplicationOperands(problemDefinition);
        }
        case ProblemType.SUBTRACTION: {
            return generateSubtractionOperands(problemDefinition);
        }
        case ProblemType.DIVISION: {
            return generateDivisionOperands(difficulty, problemDefinition);
        }
        default: {
            // if this case ever happens there will be some unexpected results
            return generateAdditionOrMultiplicationOperands(problemDefinition);
        }
    }
}

/**
 * Generates operands for Addition or Multiplication problem types. These problems
 * can have more than 2 operands and there is no concern of negative or non whole
 * number solutions
 *
 * @param problemDefinition defintion of the problem
 */
function generateAdditionOrMultiplicationOperands(
    problemDefinition: IArithmeticProblemDefinition,
): number[] {
    // number of oprands is a random value between the number of defined operand ranges in the
    // difficulty tier and number of optional extra operands
    // for example: if the operands array in the difficulty tier is: [[10, 95],[5,95]] and
    // optExtraOperands is 1, then the number of operands will be between [2,3]
    const numOperands = generateNumber(
        problemDefinition.operands.length,
        problemDefinition.operands.length + problemDefinition.optExtraOperands,
    );

    const operands = new Array<number>(numOperands);
    for (let i = 0; i < numOperands; i++) {
        // if i is less than the number of defined operand ranges, use the corresponding range
        if (i < problemDefinition.operands.length) {
            operands[i] = generateNumber(
                problemDefinition.operands[i].lowerBound,
                problemDefinition.operands[i].upperBound,
                problemDefinition.multiplesOf,
            );
        } else {
            // else use the last defined operand range
            operands[i] = generateNumber(
                problemDefinition.operands[
                    problemDefinition.operands.length - 1
                ].lowerBound,
                problemDefinition.operands[
                    problemDefinition.operands.length - 1
                ].upperBound,
                problemDefinition.multiplesOf,
            );
        }
    }
    return operands;
}

/**
 * Generates operands for Subtraction problem tpye. These problems will only
 * have 2 operands and the second operand will always be less than or equal to
 * the first to avoid negative number solutions
 *
 * @param problemDefinition definition of the problem
 */
function generateSubtractionOperands(
    problemDefinition: IArithmeticProblemDefinition,
): number[] {
    const operands = new Array<number>(problemDefinition.operands.length);
    for (let i = 0; i < operands.length; i++) {
        if (i === 0) {
            operands[i] = generateNumber(
                problemDefinition.operands[i].lowerBound,
                problemDefinition.operands[i].upperBound,
                problemDefinition.multiplesOf,
            );
        } else {
            // for subtraction if the second operand is larger than the first
            // the solution will be a negative number
            const upperBound = Math.min(
                problemDefinition.operands[i].upperBound,
                operands[0],
            );
            operands[i] = generateNumber(
                problemDefinition.operands[i].lowerBound,
                upperBound,
                problemDefinition.multiplesOf,
            );
        }
    }
    return operands;
}

/**
 * Generates operands for Division problem type. These probelems will only have
 * 2 operands and the solution will always be a whole number
 *
 * @param difficulty difficulty of the problem
 * @param problemDefinition definition of the problem
 */
function generateDivisionOperands(
    difficulty: ProblemDifficulty,
    problemDefinition: IArithmeticProblemDefinition,
): number[] {
    const operands = new Array<number>(problemDefinition.operands.length);
    let multiplicationSolution = 1;
    for (let i = 0; i < operands.length; i++) {
        operands[i] = generateNumber(
            problemDefinition.operands[i].lowerBound,
            problemDefinition.operands[i].upperBound,
            problemDefinition.multiplesOf,
        );
        multiplicationSolution *= operands[i];
    }
    // problems for g5h follow a different scheme since they include remainders.
    // In this case there is no need to worry about solutions being non whole numbers.
    // However for the problems of g3h4e through g5m, the two operands defined in the
    // template are actually cor constructing a multiplication problem that will then be
    // reversed. This way whole number solutions can be ensured.
    // For example if 5 and 4 were generated, then the problem would become 20 / 5 =
    if (difficulty !== ProblemDifficulty.G5H) {
        operands[0] = multiplicationSolution;
    }
    return operands;
}

/**
 * Computes the mathematical result of the operator applied to the operands
 *
 * @param operands the operands of the problem
 * @param operator the operator of the problem
 */
function computeArithmeticResult(operands: number[], operator: string): number {
    // for now we just deal with 1 operator per problem
    let result = findArithmeticResult(operator, operands[0], operands[1]);

    // loop if there are more than 2 operands
    for (let j = 2; j < operands.length; j++) {
        result = findArithmeticResult(operator, result, operands[j]);
    }
    return result;
}

/**
 * Since operators are stored as strings, a wrapper is needed to perform the operation
 *
 * @param operator the operator of the math problem
 * @param operandA first operand
 * @param operandB second operand
 */
function findArithmeticResult(
    operator: string,
    operandA: number,
    operandB: number,
): number {
    switch (operator) {
        case '+':
            return operandA + operandB;
        case '-':
            return operandA - operandB;
        case '*':
            return operandA * operandB;
        case '×':
            return operandA * operandB;
        case '/':
            return operandA / operandB;
        case '÷':
            return operandA / operandB;
        default:
            return 0;
    }
}

/**
 * Creates the solution array for the problem
 *
 * @param difficulty difficulty of the problem
 * @param operands operands for the problem
 * @param problemType type of problem
 * @param solutionValue numerical solution of the problem
 */
function createSolutionArray(
    difficulty: ProblemDifficulty,
    operands: number[],
    problemType: ProblemType,
    solutionValue: number,
): string[] {
    // for now we just return numerical value. Later maybe we can support
    // solution steps
    let solutionString;
    // division of difficulty g5h contains remainders in the solution so extra
    // steps are needed for those specific problems
    if (
        problemType === ProblemType.DIVISION &&
        difficulty === ProblemDifficulty.G5H
    ) {
        solutionValue = Math.floor(solutionValue);
        solutionString =
            String(solutionValue) + ' R' + (operands[0] % operands[1]);
    } else {
        solutionString = String(solutionValue);
    }

    return [solutionString];
}

/**
 * Generates incorrect solutions to this problem for multiple choice
 *
 * @param difficulty difficulty of the problem
 * @param multiplesOf modifier that forces solutions to be multiples of this
 * @param operands operands of the problem
 * @param problemType type of problem
 * @param solutionValue numerical solution to this problem
 */
function generateIncorrectSolutions(
    difficulty: ProblemDifficulty,
    multiplesOf: number,
    operands: number[],
    problemType: ProblemType,
    solutionValue: number,
): string[] {
    if (
        problemType === ProblemType.DIVISION &&
        difficulty === ProblemDifficulty.G5H
    ) {
        solutionValue = Math.floor(solutionValue);
        return generateIncorrectWholeNumberSolutionsWithRemainder(
            operands[1],
            solutionValue,
        );
    } else {
        return generateIncorrectWholeNumberSolutions(
            solutionValue,
            multiplesOf,
        );
    }
}

/**
 * Generates the problem statement. Ex: '1 + 2 ='
 *
 * @param operands operands of this problem
 * @param operator operator of this problem
 */
function createProblemStatement(operands: number[], operator: string): string {
    let problem = '';
    for (let i = 0; i < operands.length; i++) {
        if (i !== operands.length - 1) {
            problem = problem.concat(
                String(operands[i]) + ' ' + operator + ' ',
            );
        } else {
            problem = problem.concat(String(operands[i]) + ' =');
        }
    }
    return problem;
}
