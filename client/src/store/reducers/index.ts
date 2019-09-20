import { combineReducers } from 'redux';

import {
    demoReducer,
    demoActions,
    DemoAction,
    demoSelectors,
    IDemoState,
} from './demo';

export interface IRootState {
    demo: IDemoState;
}

export type Action = DemoAction;

export const actions = {
    demo: demoActions,
};

export const reducers = combineReducers({
    demo: demoReducer,
});

export const selectors = {
    demo: demoSelectors,
};
