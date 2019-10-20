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
    userToken: string;
    classroomToken: string;
}

// We specify the shape of the state in an interface
export interface IUserState {
    loading: boolean;
    error?: string;
    user?: IUser;
}

// And provide a default value for initialization
const defaultState: IUserState = {
    loading: true,
};

// Selectors are responsible for getting values in the state
export const userSelectors = {
    isLoading: (state: { user: IUserState }) => state.user.loading,
    getName: (state: { user: IUserState }) => state.user.user.name,
};

// And actions allow us to mutate the state
export const userActions = {
    setCurrentUser: createAction('user_setUser', resolve => (user: IUser) =>
        resolve({ user })
    ),
    setError: createAction('user_setError', resolve => (error: string) =>
        resolve({ error })
    ),
    setLoading: createAction('user_setLoading', resolve => (loading: boolean) =>
        resolve({ loading })
    ),
    loginStudent: createAction(
        'user_loginStudent',
        resolve => (name: string, username: string, passcode: string) =>
            resolve({ name, username, passcode })
    ),
    loginTeacher: createAction(
        'user_loginTeacher',
        resolve => (email: string, password: string) =>
            resolve({ email, password })
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
        case getType(userActions.setCurrentUser): {
            const { user } = action.payload;

            draft.loading = false;
            draft.error = undefined;
            draft.user = user;
            break;
        }
        case getType(userActions.setError): {
            const { error } = action.payload;

            draft.loading = false;
            draft.error = error;
            break;
        }
        case getType(userActions.setLoading): {
            const { loading } = action.payload;
            draft.loading = loading;
            break;
        }
    }

    return draft;
}, defaultState);
