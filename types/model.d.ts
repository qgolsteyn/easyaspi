export enum ProblemArchetype {
    ARITHMETIC = 'arithmetic',
}

export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: string;
    problem: string;
    solution: string[];
    difficulty: number;
    seed: string;
}

export interface ITemplate {
    problemArchetype: ProblemArchetype;
    problemType: string;
    operators: string[];
}
