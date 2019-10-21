/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import { IUser } from 'shared';

// We specify the shape of the state in an interface
export interface IUserState {
    loading: boolean;
    user?: Partial<IUser>;
}

// And provide a default value for initialization
const defaultState: IUserState = {
    loading: true,
};

// Selectors are responsible for getting values in the state
export const userSelectors = {
    isLoading: (state: { user: IUserState }) => state.user.loading,
    getCurrentUser: (state: { user: IUserState }) => state.user.user,
};

// And actions allow us to mutate the state
export const userActions = {
    setLoading: createAction('user_setLoading', resolve => (loading: boolean) =>
        resolve({ loading })
    ),
    setCurrentUser: createAction(
        'user_setUser',
        resolve => (user: Partial<IUser>) => resolve({ user })
    ),
    login: createAction('user_login'),
    registerStudent: createAction(
        'user_registerStudent',
        resolve => (
            authToken: string,
            name: string,
            classroomName: string,
            classroomPasscode: string
        ) => resolve({ authToken, name, classroomName, classroomPasscode })
    ),
    registerTeacher: createAction(
        'user_registerTeacher',
        resolve => (
            authToken: string,
            name: string,
            classroomName: string,
            classroomPasscode: string
        ) => resolve({ authToken, name, classroomName, classroomPasscode })
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
            draft.user = { ...draft.user, ...user };
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
