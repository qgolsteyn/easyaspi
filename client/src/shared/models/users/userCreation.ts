import { IUser } from './users';

export interface IUserCreation {
    authToken: string;
    pushToken: string;
    classroomName: string;
    classroomPasscode: string;
    user: IUser;
}
