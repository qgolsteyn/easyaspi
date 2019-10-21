/**
 * Responsible for starting the sagas of the application. Sagas are long running functions that
 * introduce side-effects in the application (such as talking to a server). They output their result
 * as actions that update the Redux store.
 */
import { spawn, delay } from 'redux-saga/effects';

import navInit from './nav';
import userInit from './user';
import classroomInit from './classroom';
import problemInit from './problems';

export function* initializeSagas() {
    yield spawn(navInit);

    yield delay(100);
    yield spawn(userInit);
    yield spawn(classroomInit);
    yield spawn(problemInit);
}
