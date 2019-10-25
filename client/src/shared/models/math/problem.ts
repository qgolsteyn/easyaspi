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

export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problem: string;
    solution: string[];
}
