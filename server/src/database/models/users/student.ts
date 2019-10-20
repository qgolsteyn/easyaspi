import * as mongoose from 'mongoose';

import { IStudent } from 'shared/src/models/users/student';

export type IStudentSchema = IStudent & mongoose.Document;

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    virtualClassroomUid: {
        type: String
    },
    mastery: {
        type: Array
    }
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const StudentTemplateModel = mongoose.model<IStudentSchema>(
    'students',
    StudentSchema
);
