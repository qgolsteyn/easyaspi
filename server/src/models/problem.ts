import * as mongoose from 'mongoose';

import { IProblem } from 'shared';

export type IProblemSchema = IProblem & mongoose.Document;

const ProblemSchema = new mongoose.Schema({
    problemArchetype: {
        type: String,
        required: true,
    },
    problemType: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        default: true,
    },
    solution: {
        type: Array,
        default: true,
    },
    difficulty: {
        type: Number,
        default: true,
    },
    seed: {
        type: Number,
        default: true,
    },
});

export const ProblemModel = mongoose.model<IProblemSchema>(
    'problemSchema',
    ProblemSchema
);
