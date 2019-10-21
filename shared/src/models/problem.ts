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

    constructor(
        problemArchetype?: ProblemArchetype,
        problemType?: ProblemType,
        problem?: string,
        solution?: string[],
    ) {
        this.problemArchetype = problemArchetype || ProblemArchetype.UNKNOWN;
        this.problemType = problemType || ProblemType.UNKNOWN;
        this.problem = problem || '';
        this.solution = solution || [''];
    }
}

export const problemSerializer = new TypedJSON(Problem);
