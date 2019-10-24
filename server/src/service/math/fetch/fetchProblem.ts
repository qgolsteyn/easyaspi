import { ProblemTemplateModel } from '@server/database/models/math/problemTemplate';
import { generateArithmeticProblem } from '@server/service/math/generate/generateProblems';

import { IProblem, ProblemArchetype, ProblemType } from '@shared/index';

export async function fetchProblem(difficultyTier: string): Promise<IProblem> {
    const template = await ProblemTemplateModel.findOne({
        problemArchetype: ProblemArchetype.ARITHMETIC,
        problemType: ProblemType.ADDITION,
    });

    if (template !== null) {
        const difficulty = template.difficultyMap.get(difficultyTier);
        if (typeof difficulty !== undefined) {
            const dbProblem = generateArithmeticProblem(
                difficulty,
                template.operators
            );

            const resProblem = {} as IProblem;
            resProblem.problemArchetype = template.problemArchetype;
            resProblem.problemType = template.problemType;

            let problem = '';
            for (let i = 0; i < dbProblem.operands.length; i++) {
                if (i !== dbProblem.operands.length - 1) {
                    problem = problem.concat(
                        String(dbProblem.operands[i]) +
                            ' ' +
                            dbProblem.operators[0] +
                            ' '
                    );
                } else {
                    problem = problem.concat(
                        String(dbProblem.operands[i]) + ' ='
                    );
                }
            }

            resProblem.problem = problem;
            resProblem.solution = dbProblem.solution;

            return resProblem;
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}
