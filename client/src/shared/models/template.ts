import { ProblemArchetype } from './problem';

export interface ITemplate {
    problemArchetype: ProblemArchetype;
    problemType: string;
    operators: string[];
}
