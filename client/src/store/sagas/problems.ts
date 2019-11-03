import { call, put, select, takeLatest } from 'redux-saga/effects';

import { IProblem } from '@shared/index';

import { actions, selectors } from '../reducers';
import * as api from './api';

export function* initProblem(): Generator<any, void, any> {
    yield takeLatest(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<any, void, any> {
        if (action.payload.screen === 'Problem') {
            const loading =
                (yield select(selectors.problems.getCurrentProblem)) === null;

            if (loading) {
                yield call(fetchNextProblem);
            }
        }
    });
    yield takeLatest(actions.problems.solveCurrentProblem, solveCurrentProblem);
    yield takeLatest(actions.problems.fetchNextProblem, fetchNextProblem);
}

function* solveCurrentProblem(): Generator<any, void, any> {
    yield put(actions.problems.fetchNextProblem());
}

function* fetchNextProblem(): Generator<any, void, any> {
    const currentProblem = yield select(
        selectors.problems.getCurrentProblemNumber,
    );
    const numberOfProblems = yield select(
        selectors.problems.getNumberOfProblems,
    );

    if (currentProblem >= numberOfProblems) {
        return;
    }

    const problem = (yield call(api.math.getNextMathProblem)) as IProblem;

    if (problem) {
        yield put(
            actions.problems.setProblem({
                problem: problem.problem,
                prompt: 'What is',
                solution: problem.solution[0],
                solved: false,
            }),
        );
    } else {
        alert('Error');
    }
}
