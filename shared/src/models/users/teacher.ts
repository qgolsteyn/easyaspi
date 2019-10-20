import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export interface ITeacher {
    name: string;
    email: string;
    virtualClassroomUid: string;
}

@jsonObject
export class Teacher {
    @jsonMember
    public name: string;

    @jsonMember
    email: string;

    @jsonMember
    virtualClassroomUid: string;

    constructor(
        name?: string,
        email?: string,
        virtualClassroomUid?: string
    ) {
        this.name = name || '';
        this.email = email || '';
        this.virtualClassroomUid = virtualClassroomUid || '';
    }
}

export const teacherSerializer = new TypedJSON(Teacher);
