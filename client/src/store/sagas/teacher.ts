import { IClassroom, IUser } from '@shared/index';
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
}

function* getClassroomInfo(): Generator<unknown, void, unknown> {
    const classroomInfo = (yield call(
        api.classroom.getClassroomInfo,
    )) as IClassroom;

    const students = (yield call(
        api.classroom.getClassroomStudents,
    )) as IUser[];

    if (classroomInfo && students) {
        yield put(actions.teacher.setTeacherInfo(classroomInfo, students));
    }
}
