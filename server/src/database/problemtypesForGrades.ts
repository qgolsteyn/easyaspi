import * as mongoose from 'mongoose';

import { IProblemTypesForGrades } from '@shared/index';

export type IProblemTypesForGradesSchema = IProblemTypesForGrades & mongoose.Document;

const ProblemTypesForGradesSchema = new mongoose.Schema({
    grade: {
        required: true,
        type: Number,
        unique: true,
    },
    problemTypes: {
        type: Array,
        required: true,
    }
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ProblemTypesForGradesModel = mongoose.model<IProblemTypesForGradesSchema>(
    'ProblemTypesForGrades',
    ProblemTypesForGradesSchema,
);
