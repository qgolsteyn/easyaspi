import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { IProblem } from 'shared';

import { actions, selectors } from '../reducers';
import { baseApi } from './api';

export default function* init() {
    yield takeLatest(actions.problems.solveCurrentProblem, solveCurrentProblem);
    yield takeLatest(actions.problems.fetchNextProblem, fetchNextProblem);
}

function* solveCurrentProblem() {
    yield put(actions.problems.fetchNextProblem());
}

function* fetchNextProblem() {
    const currentProblem = yield select(
        selectors.problems.getCurrentProblemNumber
    );
    const numberOfProblems = yield select(
        selectors.problems.getNumberOfProblems
    );

    if (currentProblem >= numberOfProblems) {
        return;
    }

    try {
        const studentId = (yield select(
            selectors.user.getCurrentUserId
        )) as string;

        const problemResponse = (yield call(
            [baseApi, baseApi.get],
            `/math/nextProblem`,
            {
                headers: {
                    studentid: studentId,
                },
            }
        )) as AxiosResponse;

        const problem = problemResponse.data as IProblem;

        if (problem) {
            yield put(
                actions.problems.setProblem({
                    prompt: 'What is',
                    problem: problem.problem,
                    solution: problem.solution[0],
                    solved: false,
                })
            );
        } else {
            alert('Error');
        }
    } catch (e) {
        alert(e);
    }

    yield put(actions.classroom.setLoading(false));
}
