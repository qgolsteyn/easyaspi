import * as mongoose from 'mongoose';
import { ProblemDifficulty, ProblemType } from '../../../../client/src/shared/models/problem';

export interface IProblemMinimumDifficulties extends mongoose.Document {
    difficulty: ProblemDifficulty;
    problemTypes: ProblemType[];
}

export const ProblemMinimumDifficultiesSchema = new mongoose.Schema({
    difficulty: {
        required: true,
        type: ProblemDifficulty,
    },
    problemTypes: {
        required: true,
        type: Array,
    },
});

export const ProblemMinimumDifficultiesModel = mongoose.model<
    IProblemMinimumDifficulties
>('problemminimumdifficulties', ProblemMinimumDifficultiesSchema);
