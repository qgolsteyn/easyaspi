import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IClassroom, IUser, UserType } from '@shared/index';

export enum AuthStage {
    AUTH_CHECK_LOADING,
    AUTH_START,
    AUTH_REGISTER,
    AUTH_LOGGED_IN,
}

// We specify the shape of the state in an interface
export interface IUserState {
    accessToken: string;
    authStage: AuthStage;
    user: IUser;
    classroom: IClassroom;
}

// And provide a default value for initialization
const defaultState: IUserState = {
    accessToken: '',
    authStage: AuthStage.AUTH_START,
    classroom: {
        name: '',
        passcode: '',
    },
    user: {
        id: '',
        registered: false,
    },
};

// Selectors are responsible for getting values in the state
export const userSelectors = {
    getAccessToken: (state: { user: IUserState }) => state.user.accessToken,
    getAuthStage: (state: { user: IUserState }) => state.user.authStage,
    getCurrentClassroom: (state: { user: IUserState }) => state.user.classroom,
    getCurrentUser: (state: { user: IUserState }) => state.user.user,
};

// And actions allow us to mutate the state
export const userActions = {
    login: createAction('auth_login'),
    register: createAction(
        'auth_register',
        resolve => (
            name: string,
            userType: UserType,
            classroomName: string,
            classroomPasscode: string
        ) => resolve({ name, userType, classroomName, classroomPasscode })
    ),
    setAccessToken: createAction(
        'auth_accessToken',
        resolve => (accessToken: string) => resolve({ accessToken })
    ),
    signout: createAction('user_signout'),
    updateAuthStage: createAction(
        'auth_update_auth_stage',
        resolve => (authStage: AuthStage) => resolve({ authStage })
    ),
    updateUserInfo: createAction(
        'auth_update',
        resolve => (user: Partial<IUser>) => resolve({ user })
    ),
};

export type AuthAction = ActionType<typeof userActions>;

// The reducer is responsible for changing the state based on actions received
export const userReducer = produce((draft: IUserState, action: AuthAction) => {
    // We switch based on the type of action
    switch (action.type) {
        case getType(userActions.setAccessToken): {
            draft.accessToken = action.payload.accessToken;
            break;
        }
        case getType(userActions.updateUserInfo): {
            draft.user = { ...draft.user, ...action.payload.user };
            break;
        }
        case getType(userActions.updateAuthStage): {
            draft.authStage = action.payload.authStage;
            break;
        }
    }

    return draft;
}, defaultState);
