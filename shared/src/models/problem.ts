import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export enum ProblemArchetype {
    ARITHMETIC = 'arithmetic',
    UNKNOWN = 'unknown',
}

export enum ProblemType {
    ADDITION = "addition",
    SUBTRACTION = "subtraction",
    MULTIPLICATION = "multiplication",
    DIVISION = "division",
    UNKNOWN = "unknown"
}

export interface IProblem {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problem: string;
    solution: string[];
    difficulty: number;
    seed: number;
}

@jsonObject
export class Problem {
    @jsonMember
    public problemArchetype: ProblemArchetype;

    @jsonMember
    problemType: ProblemType;

    @jsonMember
    problem: string;

    @jsonArrayMember(String)
    solution: string[];

    @jsonMember
    difficulty: number;

    @jsonMember
    seed: number;

    constructor(
        problemArchetype?: ProblemArchetype,
        problemType?: ProblemType,
        problem?: string,
        solution?: string[],
        difficulty?: number,
        seed?: number
    ) {
        this.problemArchetype = problemArchetype || ProblemArchetype.UNKNOWN;
        this.problemType = problemType || ProblemType.UNKNOWN;
        this.problem = problem || '';
        this.solution = solution || [''];
        this.difficulty = difficulty || 0;
        this.seed = seed || 0;
    }
}

export const problemSerializer = new TypedJSON(Problem);
