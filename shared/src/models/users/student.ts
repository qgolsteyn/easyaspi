import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

import { Mastery } from './mastery';

export interface IStudent {
    name: string;
    virtualClassroomUid: string;
    mastery: Mastery[];
}

@jsonObject
export class Student {
    @jsonMember
    public name: string;

    @jsonMember
    virtualClassroomUid: string;

    @jsonArrayMember(Mastery)
    mastery: Mastery[];

    constructor(
        name?: string,
        virtualClassroomUid?: string,
        mastery?: Mastery[]
    ) {
        this.name = name || '';
        this.virtualClassroomUid = virtualClassroomUid || '';
        this.mastery = mastery || [];
    }
}

export const studentSerializer = new TypedJSON(Student);
