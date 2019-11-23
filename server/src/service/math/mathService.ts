import { generateArithmeticProblem } from './generateArithmeticProblem';

import debug from 'debug';
import { IUser } from '@shared/models/users';
import { nextProblemTypeAndDifficulty } from '../nextProblemService';
const log = debug('pi:route');

export const fetchNextMathProblem = async (user: IUser) => {
    const nextProblem = await nextProblemTypeAndDifficulty(user);

    log(
        'problemType: ' +
            nextProblem.problemType +
            ' difficulty: ' +
            nextProblem.difficulty,
    );

    const problem = await generateArithmeticProblem(
        nextProblem.difficulty,
        nextProblem.problemType,
    );

    return problem;
};
