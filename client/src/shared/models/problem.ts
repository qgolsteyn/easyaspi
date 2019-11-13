export enum ProblemType {
    ADDITION = 'addition',
    SUBTRACTION = 'subtraction',
    MULTIPLICATION = 'multiplication',
    DIVISION = 'division',
    EQUATION = 'equation',
    FRACTION = 'fraction',
    DECIMAL = 'decimal',
    PERIMETER = 'perimeter',
    AREA = 'area',
    VOLUME = 'volume',
    UNKNOWN = 'unknown'
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
    G5H = 'g5h'
}

export function convertStringToProblemType(type: string): ProblemType {
    switch(type) {
        case ProblemType.ADDITION.valueOf(): return ProblemType.ADDITION;
        case ProblemType.SUBTRACTION.valueOf(): return ProblemType.SUBTRACTION;
        case ProblemType.MULTIPLICATION.valueOf(): return ProblemType.MULTIPLICATION;
        case ProblemType.DIVISION.valueOf(): return ProblemType.DIVISION;
        case ProblemType.EQUATION.valueOf(): return ProblemType.EQUATION;
        case ProblemType.FRACTION.valueOf(): return ProblemType.FRACTION;
        case ProblemType.DECIMAL.valueOf(): return ProblemType.DECIMAL;
        case ProblemType.PERIMETER.valueOf(): return ProblemType.PERIMETER;
        case ProblemType.AREA.valueOf(): return ProblemType.AREA;
        case ProblemType.VOLUME.valueOf(): return ProblemType.VOLUME;
        default: return ProblemType.UNKNOWN;
    }
}

// Could not figure out if it's possible to create sequential enums
export function getNextProblemDifficulty(difficulty: ProblemDifficulty): ProblemDifficulty {
    switch(difficulty) {
        case ProblemDifficulty.G1E: return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M: return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E: return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M: return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E: return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M: return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E: return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M: return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E: return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M: return ProblemDifficulty.G5H;
        case ProblemDifficulty.G5H: return ProblemDifficulty.G5H;
    }
}

export function getPreviousProblemDifficulty(difficulty: ProblemDifficulty): ProblemDifficulty {
    switch(difficulty) {
        case ProblemDifficulty.G5H: return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M: return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E: return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M: return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E: return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M: return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E: return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M: return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E: return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M: return ProblemDifficulty.G1E;
        case ProblemDifficulty.G1E: return ProblemDifficulty.G1E;
    }
}

export function minProblemDifficulty(difficulty1: ProblemDifficulty, difficulty2: ProblemDifficulty): ProblemDifficulty {
    let diff1String = difficulty1.valueOf();
    let diff2String = difficulty2.valueOf();

    // character at index 1 is the grade number
    if (diff1String.charCodeAt(1) < diff2String.charCodeAt(1)) {
        return difficulty1;
    } else if (diff1String.charCodeAt(1) > diff2String.charCodeAt(1)) {
        return difficulty2;
    } else {
        // character at index 2 is the difficulty tier for the specific grade
        if (diff1String.charAt(2) === 'e') {
            return difficulty1;
        } else if (diff1String.charAt(2) === 'm' && diff2String.charAt(2) === 'h') {
            return difficulty1;
        } else {
            return difficulty2;
        }
    }
}

export interface IProblem {
    problemType: ProblemType;
    problem: string;
    solution: string[];
}
