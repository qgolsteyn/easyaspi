import Boom from 'boom';
import {
    IProblem,
    ProblemDifficulty,
    ProblemType,
} from '../../../../client/src/shared/models/problem';
import {
    ArithmeticProblemTemplateModel,
    IArithmeticProblemDefinition,
} from '../../database/arithmeticProblemTemplate';
import {
    generateIncorrectWholeNumberSolutions,
    generateNumber,
} from './generateNumbers';

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
            const minOperands = 2;
            let operands = new Array<number>(minOperands);

            if (problemType === ProblemType.ADDITION) {
                operands = generateAdditionOrMultiplicationOperands(
                    problemDefinition,
                );
            } else if (problemType === ProblemType.SUBTRACTION) {
                operands = generateSubtractionOperands(problemDefinition);
            } else {
                Boom.notFound(
                    'Problem type is not of Addition, or Subtraction',
                );
            }

            // for now we just deal with 1 operator per problem
            let result = findArithmeticResult(
                template.operator,
                operands[0],
                operands[1],
            );

            for (let j = 2; j < operands.length; j++) {
                result = findArithmeticResult(
                    template.operator,
                    result,
                    operands[j],
                );
            }

            // for now we just return numerical value. Later maybe we can support
            // solution steps
            const solution = [String(result)];

            // generate 3 incorrect solutions in case of multiple choice
            const incorrectSolutions = generateIncorrectWholeNumberSolutions(
                result,
                problemDefinition.multiplesOf,
            );

            // construct problem string, ex: "1 + 2 ="
            let problem = '';
            for (let i = 0; i < operands.length; i++) {
                if (i !== operands.length - 1) {
                    problem = problem.concat(
                        String(operands[i]) + ' ' + template.operator[0] + ' ',
                    );
                } else {
                    problem = problem.concat(String(operands[i]) + ' =');
                }
            }

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
        case '/':
            return operandA / operandB;
        default:
            return 0;
    }
}
