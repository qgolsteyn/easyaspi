/**
 * Demo saga; used for demonstration purposes
 */

import { put } from 'redux-saga/effects';

import { actions } from '../..';

export function* demoStart() {
    yield put(actions.demo.changeDemoText('Hello from Saga land!'));
}
