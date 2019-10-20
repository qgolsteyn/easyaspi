import * as mongoose from 'mongoose';

import { ITemplate } from 'shared';

export type ITemplateSchema = ITemplate & mongoose.Document;

const ProblemTemplateSchema = new mongoose.Schema({
    problemArchetype: {
        type: String,
        required: true,
    },
    problemType: {
        type: String,
        required: true,
    },
    operators: {
        type: Array,
        required: true,
    },
    difficultyMap: {
        type: Map,
        required: true,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ProblemTemplateModel = mongoose.model<ITemplateSchema>(
    'problemtemplate',
    ProblemTemplateSchema
);
