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
    G1E = "g1e",
    G1M = "g1m",
    G1H2E = "g1h2e",
    G2M = "g2m",
    G2H3E = "g2h3e",
    G3M = "g3m",
    G3H4E = "g3h4e",
    G4M = "g4m",
    G4H5E = "g4h5e",
    G5M = "g5m",
    G5H = "g5h"
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

export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problem: string;
    solution: string[];
}
