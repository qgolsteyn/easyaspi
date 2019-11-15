import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export interface ITeacher {
    name: string;
    email: string;
    virtualClassroomUid: string;
}
export declare class Teacher {
    name: string;
    email: string;
    virtualClassroomUid: string;
    constructor(name?: string, email?: string, virtualClassroomUid?: string);
}
export declare const teacherSerializer: TypedJSON<Teacher>;
