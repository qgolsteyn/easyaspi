import * as mongoose from 'mongoose';

import { ProblemType } from '@shared/index';
import { IArithmeticDifficulty } from './arithmeticDifficulty';

export interface IProblemTemplate {
    problemType: ProblemType;
    operators: string[];
    difficultyMap: Map<string, IArithmeticDifficulty>;
}

export type IProblemTemplateSchema = IProblemTemplate & mongoose.Document;

const ProblemTemplateSchema = new mongoose.Schema({
    difficultyMap: {
        required: true,
        type: Map,
    },
    operators: {
        required: true,
        type: Array,
    },
    problemType: {
        required: true,
        type: String,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ProblemTemplateModel = mongoose.model<IProblemTemplateSchema>(
    'problemtemplate',
    ProblemTemplateSchema,
);
