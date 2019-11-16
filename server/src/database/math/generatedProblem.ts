import * as mongoose from 'mongoose';

import { ProblemType } from '@shared/index';
import { IArithmeticProblem } from './arithmeticProblem';

export interface IGeneratedProblems {
    problemType: ProblemType;
    problems: Map<string, IArithmeticProblem[]>;
}

export type IGeneratedProblemsSchema = IGeneratedProblems & mongoose.Document;

const GeneratedProblemsSchema = new mongoose.Schema({
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
    GeneratedProblemsSchema,
);
