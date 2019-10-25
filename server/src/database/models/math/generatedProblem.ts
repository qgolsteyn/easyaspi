import * as mongoose from 'mongoose';

import { ProblemArchetype, ProblemType } from '@shared/index';
import { IArithmeticProblem } from './arithmeticProblem';

export interface IGeneratedProblems {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    problems: Map<string, IArithmeticProblem[]>;
}

export type IGeneratedProblemsSchema = IGeneratedProblems & mongoose.Document;

const GeneratedProblemsSchema = new mongoose.Schema({
    problemArchetype: {
        required: true,
        type: String,
    },
    problemType: {
        required: true,
        type: String,
    },
    problems: {
        default: true,
        type: Map,
    },
});

export const GeneratedProblemsModel = mongoose.model<IGeneratedProblemsSchema>(
    'generatedproblems',
    GeneratedProblemsSchema
);
