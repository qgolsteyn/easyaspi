/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

export enum UserType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export interface IUser {
    name: string;
    username: string;
    type: UserType;
    token: string;
}

// We specify the shape of the state in an interface
export interface IUserState {
    loading: boolean;
    user?: IUser;
    classroomName?: string;
}

// And provide a default value for initialization
const defaultState: IUserState = {
    loading: true,
};

// Selectors are responsible for getting values in the state
export const userSelectors = {
    isLoading: (state: { user: IUserState }) => state.user.loading,
    getUser: (state: { user: IUserState }) => state.user.user,
    getClassroom: (state: { user: IUserState }) => state.user.classroomName,
};

// And actions allow us to mutate the state
export const userActions = {
    setUser: createAction(
        'user_setUser',
        resolve => (user: IUser, classroomName: string) =>
            resolve({ user, classroomName })
    ),
    loginStudent: createAction(
        'user_loginStudent',
        resolve => (username: string, passcode: string) =>
            resolve({ username, passcode })
    ),
    loginTeacher: createAction(
        'user_loginTeacher',
        resolve => (email: string, password: string) =>
            resolve({ email, password })
    ),
    registerStudent: createAction(
        'user_registerStudent',
        resolve => (name: string, username: string, passcode: string) =>
            resolve({ name, username, passcode })
    ),
    registerTeacher: createAction(
        'user_registerTeacher',
        resolve => (
            name: string,
            classroomName: string,
            studentPasscode: string,
            email: string,
            password: string
        ) => resolve({ name, classroomName, studentPasscode, email, password })
    ),
    signout: createAction('user_signout', resolve => () => resolve()),
};

export type UserAction = ActionType<typeof userActions>;

// The reducer is responsible for changing the state based on actions received
export const userReducer = produce((draft: IUserState, action: UserAction) => {
    // We switch based on the type of action
    switch (action.type) {
        case getType(userActions.setUser): {
            const { user, classroomName } = action.payload;

            draft.loading = false;
            draft.user = user;
            draft.classroomName = classroomName;

            return draft;
        }
        default: {
            // Redux requires us to return the state in case the action does not match
            return draft;
        }
    }
}, defaultState);
