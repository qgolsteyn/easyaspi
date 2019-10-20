import { combineReducers } from 'redux';

import { demoReducer, demoActions, demoSelectors, IDemoState } from './demo';
import { navActions } from './navigation';
import { userReducer, userSelectors, userActions, IUserState } from './user';

export interface IState {
    demo: IDemoState;
}

export const actions = {
    demo: demoActions,
    nav: navActions,
    user: userActions,
};

export const reducers = combineReducers({
    demo: demoReducer,
    user: userReducer,
});

export const selectors = {
    demo: demoSelectors,
    user: userSelectors,
};
