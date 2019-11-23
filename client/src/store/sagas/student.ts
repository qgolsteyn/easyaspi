import { IAchievement, IClassroom, IStudentStatistic } from '@shared/index';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../reducers';
import * as api from './api';

export function* initStudent(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<unknown, void, unknown> {
        if (action.payload.screen === 'Student') {
            yield call(getStudentInfo);
        }
    });
}

function* getStudentInfo(): Generator<unknown, void, unknown> {
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
}
