import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export interface IClassroom {
    name: string;
    passcode: string;
    teacherId: string;
    studentIds: string[];
}
export declare class Classroom {
    name: string;
    passcode: string;
    teacherId: string;
    studentIds: string[];
    constructor(name?: string, passcode?: string, teacherId?: string, studentIds?: string[]);
}
export declare const classroomSerializer: TypedJSON<Classroom>;
