import { IProblem } from '@shared/index';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions, selectors } from '../reducers';
import * as api from './api';

export function* initProblem(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<unknown, void, unknown> {
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

function* solveCurrentProblem(): Generator<unknown, void, unknown> {
    yield put(actions.problems.fetchNextProblem());
}

function* fetchNextProblem(): Generator<unknown, void, unknown> {
    const currentProblem = (yield select(
        selectors.problems.getCurrentProblemNumber,
    )) as number;
    const numberOfProblems = (yield select(
        selectors.problems.getNumberOfProblems,
    )) as number;

    if (currentProblem >= numberOfProblems) {
        return;
    }

    const problem = (yield call(api.math.getNextMathProblem)) as IProblem;

    if (problem) {
        yield put(
            actions.problems.setProblem({
                answers: [
                    ...problem.incorrectSolutions,
                    problem.solution[0],
                ].sort(() => Math.random() - 0.5),
                operands: problem.operands,
                operators: problem.operators,
                prompt: 'What is',
                solution: problem.solution[0],
                solved: false,
            }),
        );
    } else {
        alert('Error : could not retrieve the problem from the server');
    }
}
