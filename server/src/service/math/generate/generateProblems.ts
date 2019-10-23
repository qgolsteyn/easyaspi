import {
    ProblemTemplateModel,
    IProblemTemplateSchema,
} from '@server/database/models/math/problemTemplate';
import {
    IGeneratedProblemsSchema,
    GeneratedProblemsModel,
    IGeneratedProblems,
    GeneratedProblems,
} from '@server/database/models/math/generatedProblem';
import {
    IArithmeticProblem,
    ArithmeticProblem,
} from '@server/database/models/math/arithmeticProblem';
import { ProblemArchetype, ProblemType } from '@shared/index';
import { generateNumber } from './generateNumbers';
import { IArithmeticDifficulty } from '@server/database/models/math/arithmeticDifficulty';

const numProbsPerDifficulty = 20;

export async function generateAllProblems() {
    console.log(1);
    // set to just addition for now
    const templates = await ProblemTemplateModel.find({
        problemArchetype: ProblemArchetype.ARITHMETIC,
        problemType: ProblemType.ADDITION,
    });

    let allGeneratedProblems = new Array<IGeneratedProblems>();

    // iterate through each template and generate problems for each difficulty of those templates
    templates.forEach(template => {
        console.log(2);
        // for now we're just dealing with arithmetic, later we will have more archetypes
        if (
            template.problemArchetype.valueOf() ===
            ProblemArchetype.ARITHMETIC.valueOf()
        ) {
            console.log(3);
            let generatedProblems = new GeneratedProblems();
            console.log(4);

            generatedProblems.problemArchetype = template.problemArchetype;
            generatedProblems.problemType = template.problemType;

            let problemsMap = new Map<string, Array<IArithmeticProblem>>();

            // generate problems for all difficulty tier
            template.difficultyMap.forEach(
                (difficulty: IArithmeticDifficulty, tier: string) => {
                    if (typeof difficulty !== 'undefined') {
                        let problems = generateArithmeticProblems(
                            difficulty,
                            template.operators
                        );
                        problemsMap.set(tier, problems);
                    } else {
                        // error handling
                    }
                }
            );

            generatedProblems.problems = problemsMap;
            allGeneratedProblems.push(generatedProblems);
        }
    });

    console.log(allGeneratedProblems);

    console.log(5);
    await GeneratedProblemsModel.deleteMany({});
    console.log(6);
    //await allGeneratedProblems[0].save();
    await GeneratedProblemsModel.insertMany(allGeneratedProblems);
    console.log(7);
    return;
}

/**
 * Generate 'numProbsPerDifficulty' problems for a given difficulty
 * of a given template
 *
 * @param difficulty difficulty tier to generate problems for
 * @param template   template of the arithmetic problem
 * @return           an array of arithmetic problems
 */
function generateArithmeticProblems(
    difficulty: IArithmeticDifficulty,
    operators: string[]
): Array<IArithmeticProblem> {
    let problems = new Array<IArithmeticProblem>(numProbsPerDifficulty);
    if (typeof difficulty !== 'undefined') {
        for (let i = 0; i < numProbsPerDifficulty; i++) {
            problems[i] = generateArithmeticProblem(difficulty, operators);
        }
    }
    return problems;
}

/**
 * Generate a single problem for a given difficulty of a given template
 *
 * @param difficulty difficulty tier to generate problem for
 * @param template   template of the arithmetic problem
 */
export function generateArithmeticProblem(
    difficulty: IArithmeticDifficulty,
    operators: string[]
): IArithmeticProblem {
    let problem = new ArithmeticProblem();

    // number of oprands is a random value between the number of defined operand ranges in the
    // difficulty tier and number of optional extra operands
    // for example: if the operands array in the difficulty tier is: [[10, 95],[5,95]] and
    // optExtraOperands is 1, then the number of operands will be between [2,3]
    let numOperands = generateNumber(
        difficulty.operands.length,
        difficulty.operands.length + difficulty.optExtraOperands
    );

    // generate the operands
    let operands = new Array<number>(numOperands);
    for (let i = 0; i < numOperands; i++) {
        // if i is less than the number of defined operand ranges, use the corresponding range
        if (i < difficulty.operands.length) {
            operands[i] = generateNumber(
                difficulty.operands[i][0],
                difficulty.operands[i][1]
            );
        } else {
            // else use the last defined operand range
            operands[i] = generateNumber(
                difficulty.operands[difficulty.operands.length - 1][0],
                difficulty.operands[difficulty.operands.length - 1][1]
            );
        }
    }

    // for now we just deal with 1 operator per problem
    let result: number = findArithmeticResult(
        operators[0],
        operands[0],
        operands[1]
    );
    for (let j = 2; j < operands.length; j++) {
        result = findArithmeticResult(operators[0], result, operands[j]);
    }

    // for now we just return numerical value
    let solution = new Array<string>(1);
    solution[0] = String(result);

    problem.operands = operands;
    problem.operators = operators;
    problem.solution = solution;

    return problem;
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
    operandB: number
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
