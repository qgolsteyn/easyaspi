import { IProblem } from '@shared/index';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions, selectors } from '../reducers';
import * as api from './api';

export function* initProblem(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<unknown, void, unknown> {
        if (action.payload.screen === 'Problem') {
            const currentProblem = yield select(
                selectors.problems.getCurrentProblem,
            );
            const loading = currentProblem === null;

            if (loading) {
                yield call(fetchNextProblem);
            }
        }
    });

    yield takeLatest(actions.student.setStudentInfo, function*(
        action: ReturnType<typeof actions.student.setStudentInfo>,
    ): Generator<unknown, void, unknown> {
        yield put(
            actions.problems.setProblemSetState(
                action.payload.statistics.numDailyAttempts,
                action.payload.classroomInfo.numDailyProblems,
            ),
        );
    });

    yield takeLatest(actions.problems.solveCurrentProblem, solveCurrentProblem);
    yield takeLatest(actions.problems.fetchNextProblem, fetchNextProblem);
}

function* solveCurrentProblem(
    action: ReturnType<typeof actions.problems.solveCurrentProblem>,
): Generator<unknown, void, unknown> {
    const numberOfProblemsSolved = (yield select(
        selectors.problems.getCurrentProblemNumber,
    )) as number;
    const numberOfProblems = (yield select(
        selectors.student.getNumberOfDailyProblems,
    )) as number;

    if (numberOfProblemsSolved >= numberOfProblems) {
        yield call(api.math.notifySuccessFailure, 'addition', true);
        yield call(api.math.getNextMathProblem);
        return;
    } else {
        yield put(actions.problems.fetchNextProblem());
    }

    const currentProblem = (yield select(
        selectors.problems.getCurrentProblem,
    )) as IProblem;
    yield call(
        api.math.notifySuccessFailure,
        currentProblem.problemType,
        action.payload.success,
    );
}

function* fetchNextProblem(): Generator<unknown, void, unknown> {
    const currentProblem = (yield select(
        selectors.problems.getCurrentProblemNumber,
    )) as number;
    const numberOfProblems = (yield select(
        selectors.student.getNumberOfDailyProblems,
    )) as number;

    if (currentProblem > numberOfProblems) {
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
                problemType: problem.problemType,
                prompt: problem.problem,
                solution: problem.solution[0],
                solved: false,
            }),
        );
    }
}
