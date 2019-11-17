import { ProblemDifficulty, ProblemType } from '@shared/models/problem';
import { generateArithmeticProblem } from './generateArithmeticProblem';
import { generateNumber } from './generateNumbers';

import debug from 'debug';
const log = debug('pi:route');

export const fetchNextMathProblem = async () => {
    // call next problem algo using user object
    const supportedTypes = [ProblemType.ADDITION];
    const difficulties = [
        ProblemDifficulty.G1E,
        ProblemDifficulty.G1M,
        ProblemDifficulty.G1H2E,
        ProblemDifficulty.G2M,
        ProblemDifficulty.G2H3E,
        ProblemDifficulty.G3M,
        ProblemDifficulty.G3H4E,
        ProblemDifficulty.G4M,
        ProblemDifficulty.G4H5E,
        ProblemDifficulty.G5M,
        ProblemDifficulty.G5H,
    ];

    // for now just randomize this stuff, later on we need to use next problem algo
    const supportedTypesIndex = generateNumber(0, supportedTypes.length - 1);
    const difficultiesIndex = generateNumber(0, difficulties.length - 1);

    log(
        'problemType: ' +
            supportedTypes[supportedTypesIndex] +
            ' difficulty: ' +
            difficulties[difficultiesIndex],
    );

    const problem = await generateArithmeticProblem(
        difficulties[difficultiesIndex],
        supportedTypes[supportedTypesIndex],
    );

    return problem;
};
