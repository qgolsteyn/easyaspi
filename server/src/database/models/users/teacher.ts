import * as mongoose from 'mongoose';

import { ITeacher } from 'shared/src/models/users/teacher';

export type ITeacherSchema = ITeacher & mongoose.Document;

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    virtualClassroomUid: {
        type: String,
        unique: true
    }
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const TeacherTemplateModel = mongoose.model<ITeacherSchema>(
    'teachers',
    TeacherSchema
);
