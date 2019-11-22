import { ProblemDifficulty, ProblemType } from '@shared/models/problem';
import { generateArithmeticProblem } from './generateArithmeticProblem';
import { generateNumber } from './generateNumbers';

import debug from 'debug';
const log = debug('pi:route');

export const fetchNextMathProblem = async () => {
    // call next problem algo using user object
    const supportedTypes = [
        ProblemType.ADDITION,
        ProblemType.SUBTRACTION,
        ProblemType.MULTIPLICATION,
        ProblemType.DIVISION,
    ];
    const additionDiffs = [
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

    const six = 6;
    const subDiffs = additionDiffs.slice(1);
    const multDivDiffs = additionDiffs.slice(six);

    // for now just randomize this stuff, later on we need to use next problem algo
    const supportedTypesIndex = generateNumber(0, supportedTypes.length - 1);

    let difficulty: ProblemDifficulty;
    if (supportedTypes[supportedTypesIndex] === ProblemType.ADDITION) {
        difficulty = additionDiffs[generateNumber(0, additionDiffs.length - 1)];
    } else if (
        supportedTypes[supportedTypesIndex] === ProblemType.SUBTRACTION
    ) {
        difficulty = subDiffs[generateNumber(0, subDiffs.length - 1)];
    } else {
        difficulty = multDivDiffs[generateNumber(0, multDivDiffs.length - 1)];
    }

    log(
        'problemType: ' +
            supportedTypes[supportedTypesIndex] +
            ' difficulty: ' +
            difficulty,
    );

    const problem = await generateArithmeticProblem(
        difficulty,
        supportedTypes[supportedTypesIndex],
    );

    return problem;
};
