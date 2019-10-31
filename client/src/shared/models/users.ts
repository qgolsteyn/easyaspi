export enum UserType {
    STUDENT = 'student',
    TEACHER = 'teacher',
    UNKNOWN = 'unknown',
}

export interface IUser {
    id: string;
    registered: boolean;
    name?: string;
    pushToken?: string;
    email?: string;
    userType?: string;
    virtualClassroomUid?: string;
}
