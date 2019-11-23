import { IUser } from '@shared/models/users';
import debug from 'debug';
import { generateArithmeticProblem } from './generateArithmeticProblem';
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
