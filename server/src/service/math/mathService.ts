import { ProblemType } from '@shared/models/problem';

import { IUser } from '@shared/models/users';
import debug from 'debug';
import { nextProblemTypeAndDifficulty } from '../nextProblemService';
import { generateArithmeticProblem } from './generateArithmeticProblem';
import { generateGeometryProblem } from './generateGeometryProblem';

const log = debug('pi:route');

export const fetchNextMathProblem = async (user: IUser) => {
    const nextProblem = await nextProblemTypeAndDifficulty(user);

    log(
        'problemType: ' +
            nextProblem.problemType +
            ' difficulty: ' +
            nextProblem.difficulty,
    );

    if (
        nextProblem.problemType === ProblemType.AREA ||
        nextProblem.problemType === ProblemType.PERIMETER
    ) {
        return await generateGeometryProblem(
            nextProblem.difficulty,
            nextProblem.problemType,
        );
    } else {
        return await generateArithmeticProblem(
            nextProblem.difficulty,
            nextProblem.problemType,
        );
    }
};
