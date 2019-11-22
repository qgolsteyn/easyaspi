import * as mongoose from 'mongoose';

import { IClassroom } from '@shared/index';

export type IClassroomSchema = IClassroom & mongoose.Document;

const ClassroomSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    passcode: {
        required: true,
        type: String,
    },
    problemsForToday: {
        type: Array,
    },
    resourceWeb: {
        type: String,
    },
});

export const ClassroomModel = mongoose.model<IClassroomSchema>(
    'classrooms',
    ClassroomSchema,
);
