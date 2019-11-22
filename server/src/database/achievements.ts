import * as mongoose from 'mongoose';

import { IAchievement } from '@shared/index';

export type IAchievementSchema = IAchievement & mongoose.Document;

const AchievementSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String,
    },
    imgUrl: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const AchievementModel = mongoose.model<IAchievementSchema>(
    'achievements',
    AchievementSchema,
);
