import { IClassroom, IClassroomStatistic, IUser } from '@shared/index';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../reducers';
import * as api from './api';

export function* initTeacher(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.goToScreen, function*(
        action: ReturnType<typeof actions.nav.goToScreen>,
    ): Generator<unknown, void, unknown> {
        if (action.payload.screen === 'Teacher') {
            yield call(getClassroomInfo);
        }
    });

    yield takeLatest(actions.teacher.setCurrentStudent, setCurrentStudent);
    yield takeLatest(actions.teacher.update, updateClassroom);
}

function* getClassroomInfo(): Generator<unknown, void, unknown> {
    yield put(actions.teacher.setLoading(true));
    const classroomInfo = (yield call(
        api.classroom.getClassroomInfo,
    )) as IClassroom;

    const statistics = (yield call(
        api.classroom.getStatistics,
    )) as IClassroomStatistic;

    const students = (yield call(
        api.classroom.getClassroomStudents,
    )) as IUser[];

    if (classroomInfo && students && statistics) {
        yield put(
            actions.teacher.setTeacherInfo(classroomInfo, students, statistics),
        );
    }
    yield put(actions.teacher.setLoading(false));
}

function* setCurrentStudent(): Generator<unknown, void, unknown> {
    yield put(actions.nav.goToScreen('StudentStats'));
}

function* updateClassroom(
    action: ReturnType<typeof actions.teacher.update>,
): Generator<unknown, void, unknown> {
    yield put(actions.teacher.setLoading(true));
    yield call(api.classroom.updateClassroom, action.payload.classroomInfo);
    yield call(getClassroomInfo);
    yield put(actions.nav.goBack());
    yield put(actions.teacher.setLoading(false));
}
