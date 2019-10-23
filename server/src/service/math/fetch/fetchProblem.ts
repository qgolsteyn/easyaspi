import { ProblemTemplateModel } from '@server/database/models/math/problemTemplate';
import { generateArithmeticProblem } from '@server/service/math/generate/generateProblems';
import { ProblemArchetype, ProblemType, Problem } from '@shared/index';
import { ObjectId } from 'bson';

export async function fetchProblem(
    studentId: ObjectId,
    difficultyTier: string
): Promise<Problem> {
    const template = await ProblemTemplateModel.findOne({
        problemArchetype: ProblemArchetype.ARITHMETIC,
        problemType: ProblemType.ADDITION,
    });

    if (template !== null) {
        const difficulty = template.difficultyMap.get(difficultyTier);
        if (typeof difficulty !== 'undefined') {
            const db_problem = generateArithmeticProblem(
                difficulty,
                template.operators
            );

            let res_problem = new Problem();
            res_problem.problemArchetype = template.problemArchetype;
            res_problem.problemType = template.problemType;

            let problem = '';
            for (let i = 0; i < db_problem.operands.length; i++) {
                if (i !== db_problem.operands.length - 1) {
                    problem = problem.concat(
                        String(db_problem.operands[i]) +
                            ' ' +
                            db_problem.operators[0] +
                            ' '
                    );
                } else {
                    problem = problem.concat(
                        String(db_problem.operands[i]) + ' ='
                    );
                }
            }

            res_problem.problem = problem;
            res_problem.solution = db_problem.solution;

            return res_problem;
        } else {
            return new Problem();
            // error handling for undefined difficulty
        }
    } else {
        return new Problem();
        // error handling for null template
    }
}
