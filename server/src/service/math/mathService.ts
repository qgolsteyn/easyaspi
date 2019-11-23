import { IUser } from '@shared/models/users';
import debug from 'debug';
import { nextProblemTypeAndDifficulty } from '../nextProblemService';
import { generateArithmeticProblem } from './generateArithmeticProblem';

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
