/**
 * This file is the entry point for our Redux store
 */

import {
    compose,
    createStore as createReduxStore,
    combineReducers,
} from 'redux';

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

const reducers = combineReducers({
    demo: demoReducer,
});

export const selectors = {
    demo: demoSelectors,
};

export const createStore = () => {
    // We used the Redux chrome extension for debugging purposes
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createReduxStore(reducers, composeEnhancers());

    return store;
};
