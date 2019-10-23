import { takeLatest, select, call, put } from 'redux-saga/effects';
import { IUser } from '@shared';

import { actions, selectors } from '../reducers';
import { baseApi } from './api';
import { AxiosResponse } from 'axios';

export default function* init() {
    yield takeLatest(actions.classroom.fetchClassroom, fetchClassroom);
    yield takeLatest(actions.classroom.notifyStudent, notifyStudent);
}

function* fetchClassroom() {
    yield put(actions.classroom.setLoading(true));

    try {
        const classroomId = ((yield select(
            selectors.user.getCurrentUser
        )) as IUser).virtualClassroomUid;

        const classroomResponse = (yield call(
            [baseApi, baseApi.get],
            `/classroom/${classroomId}`
        )) as AxiosResponse;

        if (classroomResponse.data) {
            yield put(actions.classroom.setClassroom(classroomResponse.data));
        } else {
            alert('Invalid response');
        }
    } catch (e) {
        alert(e);
    }

    yield put(actions.classroom.setLoading(false));
}

function* notifyStudent(
    action: ReturnType<typeof actions.classroom.notifyStudent>
) {
    try {
        (yield call(
            [baseApi, baseApi.post],
            `/notification/message/${action.payload.studentId}`,
            { message: 'Do your homework!' }
        )) as AxiosResponse;
    } catch (e) {
        alert(e);
    }
}
