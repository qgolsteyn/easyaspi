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

export const ClassroomModel = mongoose.model<IClassroomSchema>(
    'classrooms',
    ClassroomSchema,
);
