import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

import { ProblemArchetype } from './problem';

export interface ITemplate {
    problemArchetype: ProblemArchetype;
    problemType: string;
    operators: string[];
}

@jsonObject
export class Template {
    @jsonMember
    public problemArchetype: ProblemArchetype;

    @jsonMember
    problemType: string;

    @jsonArrayMember(String)
    operators: string[];

    constructor(
        problemArchetype?: ProblemArchetype,
        problemType?: string,
        operators?: string[]
    ) {
        this.problemArchetype = problemArchetype || ProblemArchetype.UNKNOWN;
        this.problemType = problemType || '';
        this.operators = operators || [];
    }
}

export const templateSerializer = new TypedJSON(Template);
