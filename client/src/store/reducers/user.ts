/**
 * Demo reducer and actions for reference purposes
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IUser, UserType } from '@shared/index';

// We specify the shape of the state in an interface
export interface IUserState {
    loading: boolean;
    authToken?: string;
    user?: Partial<IUser>;
    userId?: string;
}

// And provide a default value for initialization
const defaultState: IUserState = {
    loading: false,
};

// Selectors are responsible for getting values in the state
export const userSelectors = {
    getAuthToken: (state: { user: IUserState }) => state.user.authToken,
    getCurrentUser: (state: { user: IUserState }) => state.user.user,
    getCurrentUserId: (state: { user: IUserState }) => state.user.userId,
    isLoading: (state: { user: IUserState }) => state.user.loading,
};

// And actions allow us to mutate the state
export const userActions = {
    login: createAction('user_login'),
    register: createAction(
        'user_register',
        resolve => (
            name: string,
            userType: UserType,
            classroomName: string,
            classroomPasscode: string
        ) =>
            resolve({
                classroomName,
                classroomPasscode,
                name,
                userType,
            })
    ),
    setAuthToken: createAction('user_setAuth', resolve => (authToken: string) =>
        resolve({ authToken })
    ),
    setCurrentUser: createAction(
        'user_setUser',
        resolve => (user: Partial<IUser>) => resolve({ user })
    ),
    setCurrentUserId: createAction('user_setUserId', resolve => (id: string) =>
        resolve({ id })
    ),
    setLoading: createAction('user_setLoading', resolve => (loading: boolean) =>
        resolve({ loading })
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
            draft.user = { ...draft.user, ...user };
            break;
        }
        case getType(userActions.setCurrentUserId): {
            const { id } = action.payload;
            draft.userId = id;
            break;
        }
        case getType(userActions.setAuthToken): {
            const { authToken } = action.payload;
            draft.authToken = authToken;
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
