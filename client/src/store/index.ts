/**
 * This file is the entry point for our Redux store
 */

import { applyMiddleware, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducers } from './reducers';
export { actions, selectors } from './reducers';

import { initializeSagas } from './sagas';

export const createStore = () => {
    // Redux saga is used to introduce side-effects in our application
    const reduxSaga = createSagaMiddleware();

    const reduxStore = createReduxStore(reducers, applyMiddleware(reduxSaga));

    reduxSaga.run(initializeSagas);

    return reduxStore;
};
