export enum UserType {
    STUDENT = 'student',
    TEACHER = 'teacher',
    UNKNOWN = 'unknown',
}

export interface IUser {
    name: string;
    userType: string;
    virtualClassroomUid: string;
}
