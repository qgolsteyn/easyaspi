import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export declare enum ProblemArchetype {
    ARITHMETIC = "arithmetic",
    UNKNOWN = "unknown"
}
export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: string;
    problem: string;
    solution: string[];
    difficulty: number;
    seed: number;
}
export declare class Problem {
    problemArchetype: ProblemArchetype;
    problemType: string;
    problem: string;
    solution: string[];
    difficulty: number;
    seed: number;
    constructor(problemArchetype?: ProblemArchetype, problemType?: string, problem?: string, solution?: string[], difficulty?: number, seed?: number);
}
export declare const problemSerializer: TypedJSON<Problem>;
