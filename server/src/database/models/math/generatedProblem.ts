import * as mongoose from 'mongoose';

import { ProblemArchetype, ProblemType } from '@shared/index';
import { IArithmeticProblem } from './arithmeticProblem';

export interface IGeneratedProblems {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problems: Map<string, Array<IArithmeticProblem>>;
}

export class GeneratedProblems implements IGeneratedProblems {
    problemArchetype!: ProblemArchetype;
    problemType!: ProblemType;
    problems!: Map<string, Array<IArithmeticProblem>>;

    ProblemTemplate() {
        this.problemArchetype = ProblemArchetype.UNKNOWN;
        this.problemType = ProblemType.UNKNOWN;
        this.problems = new Map<string, Array<IArithmeticProblem>>();
    }
}

export type IGeneratedProblemsSchema = IGeneratedProblems & mongoose.Document;

const GeneratedProblemsSchema = new mongoose.Schema({
    problemArchetype: {
        type: String,
        required: true,
    },
    problemType: {
        type: String,
        required: true,
    },
    problems: {
        type: Map,
        default: true,
    },
});

export const GeneratedProblemsModel = mongoose.model<IGeneratedProblemsSchema>(
    'generatedproblems',
    GeneratedProblemsSchema
);
