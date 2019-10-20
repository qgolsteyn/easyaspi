import { ProblemTemplateModel } from '../../../database/models/math/problemTemplate';
import { IGeneratedProblemsSchema, GeneratedProblemsModel, IGeneratedProblems, GeneratedProblems } from '../../../database/models/math/generatedProblem';
import { IArithmeticProblem, ArithmeticProblem } from '../../../database/models/math/arithmeticProblem';
import { ProblemArchetype, ProblemType } from 'shared';
import { generateNumber } from './generateNumbers';
import { IArithmeticDifficulty } from '../../../database/models/math/arithmeticDifficulty';

const numProbsPerDifficulty = 20;

export async function generateAllProblems() {
    console.log(1);
    // set to just addition for now
    const templates = await ProblemTemplateModel.find({
        problemArchetype: ProblemArchetype.ARITHMETIC, 
        problemType: ProblemType.ADDITION
    });
    
    let allGeneratedProblems = new Array<IGeneratedProblems>();

    // iterate through each template and generate problems for each difficulty of those templates
    templates.forEach(template => {
        console.log(2);
        // for now we're just dealing with arithmetic, later we will have more archetypes
        if (template.problemArchetype.valueOf() === ProblemArchetype.ARITHMETIC.valueOf()) {
            console.log(3);
            let generatedProblems = new GeneratedProblems();
            console.log(4);
            
            generatedProblems.problemArchetype = template.problemArchetype;
            generatedProblems.problemType = template.problemType;

            let problemsMap = new Map<string, Array<IArithmeticProblem>>();

            // generate problems for all difficulty tier
            template.difficultyMap.forEach((difficulty: IArithmeticDifficulty, tier: string) => {
                
                let problems = new Array<IArithmeticProblem>(numProbsPerDifficulty);

                // difficulty map of the current difficulty tier
                if (typeof difficulty !== 'undefined') {
                    // generate n problems for this difficulty tier
                    for (let i = 0; i < numProbsPerDifficulty; i++) {
                        let problem = new ArithmeticProblem();

                        // number of oprands is a random value between the number of defined operand ranges in the 
                        // difficulty tier and number of optional extra operands
                        // for example: if the operands array in the difficulty tier is: [[10, 95],[5,95]] and
                        // optExtraOperands is 1, then the number of operands will be between [2,3]
                        let numOperands = generateNumber(difficulty.operands.length, 
                            difficulty.operands.length + difficulty.optExtraOperands);

                        // generate the operands
                        let operands = new Array<number>(numOperands);
                        for (let j = 0; j < numOperands; j++) {
                            // if j is less than the number of defined operand ranges, use the corresponding range
                            if (j < difficulty.operands.length) {
                                operands[j] = generateNumber(difficulty.operands[j][0], 
                                    difficulty.operands[j][1]);
                            } else {
                                // else use the last defined operand range
                                operands[j] = generateNumber(difficulty.operands[difficulty.operands.length-1][0], 
                                    difficulty.operands[difficulty.operands.length-1][1]);
                            }
                        }

                        // for now we just deal with 1 operator per problem
                        let result: number = findArithmeticResult(template.operators[0], operands[0], operands[1]);
                        for (let k = 2; k < operands.length; k++) {
                            result = findArithmeticResult(template.operators[0], result, operands[k]);
                        }

                        // for now we just return numerical value
                        let solution = new Array<string>(1);
                        solution[0] = String(result);


                        problem.operands = operands;
                        problem.operators = template.operators;
                        problem.solution = solution;

                        problems[i] = problem;
                    }
                } else {
                    // error handling
                }

                problemsMap.set(tier, problems);
            });

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

function findArithmeticResult(operator: string, operandA: number, operandB: number): number {
    switch(operator) {
        case "+":
            return operandA + operandB;
        case "-":
            return operandA - operandB;
        case "*":
            return operandA * operandB;
        case "/":
            return operandA / operandB;
        default:
            return 0;
    }
}