import { combineReducers } from 'redux';

import { demoReducer, demoActions, demoSelectors, IDemoState } from './demo';
import { navActions } from './navigation';

export interface IState {
    demo: IDemoState;
}

export const actions = {
    demo: demoActions,
    nav: navActions,
};

export const reducers = combineReducers({
    demo: demoReducer,
});

export const selectors = {
    demo: demoSelectors,
};
