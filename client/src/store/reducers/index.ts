import { combineReducers } from 'redux';

import { demoReducer, demoActions, demoSelectors, IDemoState } from './demo';

export interface IState {
    demo: IDemoState;
}

export const actions = {
    demo: demoActions,
};

export const reducers = combineReducers({
    demo: demoReducer,
});

export const selectors = {
    demo: demoSelectors,
};
