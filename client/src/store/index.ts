/**
 * This file is the entry point for our Redux store
 */

import { compose, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducers } from './reducers';
export { actions, selectors, IRootState, Action } from './reducers';

import { initializeSagas } from './sagas';

export const createStore = () => {
    // Redux saga is used to introduce side-effects in our application
    const reduxSaga = createSagaMiddleware();

    // We used the Redux chrome extension for debugging purposes
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reduxStore = createReduxStore(reducers, composeEnhancers(reduxSaga));

    reduxSaga.run(initializeSagas);

    return reduxStore;
};
