/**
 * Responsible for starting the sagas of the application. Sagas are long running functions that
 * introduce side-effects in the application (such as talking to a server). They output their result
 * as actions that update the Redux store.
 */
import { delay, spawn } from 'redux-saga/effects';

import { initNav } from './nav';
import { initProblem } from './problems';
import { initTeacher } from './teacher';
import { initUser } from './user';

const NAV_SETUP_TIME = 100;

export function* initializeSagas(): Generator<unknown, void, unknown> {
    yield spawn(initNav);

    yield delay(NAV_SETUP_TIME);
    yield spawn(initUser);
    yield spawn(initProblem);
    yield spawn(initTeacher);
}
