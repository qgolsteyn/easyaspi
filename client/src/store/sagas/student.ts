import { IAchievement, IClassroom, IStudentStatistic } from '@shared/index';
import { call, put, takeEvery } from 'redux-saga/effects';
import { actions } from '../reducers';
import * as api from './api';

export function* initStudent(): Generator<unknown, void, unknown> {
    yield takeEvery(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<unknown, void, unknown> {
        if (
            action.payload.screen === 'Student' ||
            action.payload.screen === 'Achievements'
        ) {
            yield call(getStudentInfo);
        }
    });
}

function* getStudentInfo(): Generator<unknown, void, unknown> {
    yield put(actions.student.setLoading(true));
    const classroomInfo = (yield call(
        api.classroom.getClassroomInfo,
    )) as IClassroom;

    const achievements = (yield call(
        api.student.getAchievements,
    )) as IAchievement[];

    const statistics = (yield call(
        api.student.getStatistics,
    )) as IStudentStatistic;

    if (classroomInfo && achievements && statistics) {
        yield put(
            actions.student.setStudentInfo(
                classroomInfo,
                achievements,
                statistics,
            ),
        );
    }
    yield put(actions.student.setLoading(false));
}
