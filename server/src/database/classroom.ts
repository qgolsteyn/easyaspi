import * as mongoose from 'mongoose';

import { IClassroom } from '@shared/index';

export type IClassroomSchema = IClassroom & mongoose.Document;

const ClassroomSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    numDailyProblems: {
        type: Number,
    },
    onlineResources: {
        type: String,
    },
    passcode: {
        required: true,
        type: String,
    },
    problemsForToday: {
        type: Array,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ClassroomModel = mongoose.model<IClassroomSchema>(
    'classrooms',
    ClassroomSchema,
);
