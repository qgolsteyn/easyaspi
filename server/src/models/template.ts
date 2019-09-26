import * as mongoose from 'mongoose';

import { ITemplate } from 'shared';

export type ITemplateSchema = ITemplate & mongoose.Document;

const TemplateSchema = new mongoose.Schema({
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
});

export const TemplateModel = mongoose.model<ITemplateSchema>(
    'templateSchema',
    TemplateSchema
);
