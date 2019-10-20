import * as mongoose from 'mongoose';

import { IClassroom } from 'shared/src/models/classroom/classroom';

export type IClassroomSchema = IClassroom & mongoose.Document;

const ClassroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    passcode: {
        type: String,
        required: true
    },
    teacherId: {
        type: String
    },
    studentIds: {
        type: Array
    }
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ClassroomTemplateModel = mongoose.model<IClassroomSchema>(
    'classrooms',
    ClassroomSchema
);
