import { takeLatest, put, call } from 'redux-saga/effects';

import { actions } from '../reducers';

export default function* init() {
    yield takeLatest(actions.problems.solveCurrentProblem, solveCurrentProblem);
    yield takeLatest(actions.problems.fetchNextProblem, fetchNextProblem);
}

function* solveCurrentProblem() {}

function* fetchNextProblem() {}
