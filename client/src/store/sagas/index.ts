/**
 * Responsible for starting the sagas of the application. Sagas are long running functions that
 * introduce side-effects in the application (such as talking to a server). They output their result
 * as actions that update the Redux store.
 */

import { spawn } from 'redux-saga/effects';
import navInit from './nav';

export function* initializeSagas() {
    yield spawn(navInit);
}
