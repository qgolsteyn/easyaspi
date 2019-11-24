export enum ProblemType {
    ADDITION = 'addition',
    SUBTRACTION = 'subtraction',
    MULTIPLICATION = 'multiplication',
    DIVISION = 'division',
    PERIMETER = 'perimeter',
    AREA = 'area',
    UNKNOWN = 'unknown',
}

export enum ProblemDifficulty {
    G1E = 'g1e',
    G1M = 'g1m',
    G1H2E = 'g1h2e',
    G2M = 'g2m',
    G2H3E = 'g2h3e',
    G3M = 'g3m',
    G3H4E = 'g3h4e',
    G4M = 'g4m',
    G4H5E = 'g4h5e',
    G5M = 'g5m',
    G5H = 'g5h',
    UNKNOWN = 'unknown',
}

export enum GeometricShape {
    SQUARE = 'square',
    RECTANGLE = 'rectangle',
    RIGHT_TRIANGLE = 'rightTriangle',
    EQUILATERAL_TRIANGLE = 'equilateralTriangle',
}

export function convertStringToProblemType(type: string): ProblemType {
    switch (type) {
        case ProblemType.ADDITION.valueOf():
            return ProblemType.ADDITION;
        case ProblemType.SUBTRACTION.valueOf():
            return ProblemType.SUBTRACTION;
        case ProblemType.MULTIPLICATION.valueOf():
            return ProblemType.MULTIPLICATION;
        case ProblemType.DIVISION.valueOf():
            return ProblemType.DIVISION;
        case ProblemType.PERIMETER.valueOf():
            return ProblemType.PERIMETER;
        case ProblemType.AREA.valueOf():
            return ProblemType.AREA;
        default:
            return ProblemType.UNKNOWN;
    }
}

// Could not figure out if it's possible to create sequential enums
export function getNextProblemDifficulty(
    difficulty: ProblemDifficulty,
): ProblemDifficulty {
    switch (difficulty) {
        case ProblemDifficulty.G1E:
            return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M:
            return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E:
            return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M:
            return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E:
            return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M:
            return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E:
            return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M:
            return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E:
            return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M:
            return ProblemDifficulty.G5H;
        case ProblemDifficulty.G5H:
            return ProblemDifficulty.G5H;
        default:
            return ProblemDifficulty.UNKNOWN;
    }
}

export function getPreviousProblemDifficulty(
    difficulty: ProblemDifficulty,
): ProblemDifficulty {
    switch (difficulty) {
        case ProblemDifficulty.G5H:
            return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M:
            return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E:
            return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M:
            return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E:
            return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M:
            return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E:
            return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M:
            return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E:
            return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M:
            return ProblemDifficulty.G1E;
        case ProblemDifficulty.G1E:
            return ProblemDifficulty.G1E;
        case ProblemDifficulty.UNKNOWN:
            return ProblemDifficulty.UNKNOWN;
    }
}

export function minProblemDifficulty(
    difficulty1: ProblemDifficulty,
    difficulty2: ProblemDifficulty,
): ProblemDifficulty {
    // way to get around "no magic numbers" linting complaint
    const two = 2;
    const easy = 'e';
    const med = 'm';
    const hard = 'h';
    const diff1String = difficulty1.valueOf();
    const diff2String = difficulty2.valueOf();

    // character at index 1 is the grade number
    if (diff1String.charCodeAt(1) < diff2String.charCodeAt(1)) {
        return difficulty1;
    } else if (diff1String.charCodeAt(1) > diff2String.charCodeAt(1)) {
        return difficulty2;
    } else {
        // character at index 2 is the difficulty tier for the specific grade
        if (diff1String.charAt(two) === easy) {
            return difficulty1;
        } else if (
            diff1String.charAt(two) === med &&
            diff2String.charAt(two) === hard
        ) {
            return difficulty1;
        } else {
            return difficulty2;
        }
    }
}

export interface IProblem {
    incorrectSolutions: string[];
    operands: number[];
    operators: string[];
    problem: string;
    problemType: ProblemType;
    solution: string[];
}
