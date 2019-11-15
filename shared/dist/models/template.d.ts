import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
import { ProblemArchetype } from './problem';
export interface ITemplate {
    problemArchetype: ProblemArchetype;
    problemType: string;
    operators: string[];
}
export declare class Template {
    problemArchetype: ProblemArchetype;
    problemType: string;
    operators: string[];
    constructor(problemArchetype?: ProblemArchetype, problemType?: string, operators?: string[]);
}
export declare const templateSerializer: TypedJSON<Template>;
