import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export interface IClassroom {
    name: string;
    passcode: string;
    teacherId: string;
    studentIds: string[];
}

@jsonObject
export class Classroom {
    @jsonMember
    public name: string;

    @jsonMember
    passcode: string;

    @jsonMember
    teacherId: string;

    @jsonArrayMember(Array)
    studentIds: string[];

    constructor(
        name?: string,
        passcode?: string,
        teacherId?: string,
        studentIds?: string[]
    ) {
        this.name = name || '';
        this.passcode = passcode || '';
        this.teacherId = teacherId || '';
        this.studentIds = studentIds || [];
    }
}

export const classroomSerializer = new TypedJSON(Classroom);
