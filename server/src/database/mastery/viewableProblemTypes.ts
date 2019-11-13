import { ProblemDifficulty, ProblemType } from '@shared/models/problem';
import * as mongoose from 'mongoose';

export interface IViewableProblemTypes extends mongoose.Document {
    difficulty: ProblemDifficulty,
    problemTypes: ProblemType[]
}

export const ViewableProblemTypesSchema = new mongoose.Schema({
    difficulty: {
        required: true,
        type: ProblemDifficulty
    },
    problemTypes: {
        required: true,
        type: Array
    }
});

export const ViewableProblemTypesModel = mongoose.model<IViewableProblemTypes>(
    'viewableproblemtypes', 
    ViewableProblemTypesSchema
);