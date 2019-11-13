export enum ProblemArchetype {
    ARITHMETIC = 'arithmetic',
    UNKNOWN = 'unknown',
}

export enum ProblemType {
    ADDITION = 'addition',
    SUBTRACTION = 'subtraction',
    MULTIPLICATION = 'multiplication',
    DIVISION = 'division',
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
    G5H = 'g5h'
}

export function convertStringToProblemType(type:string): ProblemType {
    switch(type) {
        case ProblemType.ADDITION.valueOf(): return ProblemType.ADDITION;
        case ProblemType.SUBTRACTION.valueOf(): return ProblemType.SUBTRACTION;
        case ProblemType.MULTIPLICATION.valueOf(): return ProblemType.MULTIPLICATION;
        case ProblemType.DIVISION.valueOf(): return ProblemType.DIVISION;
        default: return ProblemType.UNKNOWN;
    }
}

// Could not figure out if it's possible to create sequential enums
export function getNextProblemDifficulty(difficulty:ProblemDifficulty):ProblemDifficulty {
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

export function getPreviousProblemDifficulty(difficulty:ProblemDifficulty):ProblemDifficulty {
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

export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problem: string;
    solution: string[];
}
