import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
import { Mastery } from './mastery';
export interface IStudent {
    name: string;
    virtualClassroomUid: string;
    mastery: Mastery[];
}
export declare class Student {
    name: string;
    virtualClassroomUid: string;
    mastery: Mastery[];
    constructor(name?: string, virtualClassroomUid?: string, mastery?: Mastery[]);
}
export declare const studentSerializer: TypedJSON<Student>;
