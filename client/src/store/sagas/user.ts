import { AsyncStorage } from 'react-native';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { actions } from '../reducers';

const USER_INFO_STORAGE_KEY = 'user_info';

export default function* init() {
    yield call(fetchAuthenticationInfo);

    yield takeLatest(actions.user.registerStudent, registerStudent);
    yield takeLatest(actions.user.registerTeacher, registerTeacher);
}

function* fetchAuthenticationInfo() {
    const userInfo = JSON.parse(
        yield call(AsyncStorage.getItem, USER_INFO_STORAGE_KEY)
    );

    if (userInfo) {
        yield put(actions.user.setUser(userInfo.user, userInfo.classroomName));

        if (userInfo.user.type === 'STUDENT') {
            yield put(actions.nav.goToScreen('Student'));
        } else if (userInfo.user.type === 'TEACHER') {
            yield put(actions.nav.goToScreen('Teacher'));
        }
    } else {
        yield put(actions.user.setUser(undefined, undefined));
    }
}

function* loginTeacher() {}

function* loginStudent() {}

function* registerStudent(
    action: ReturnType<typeof actions.user.registerStudent>
) {
    const { name } = action.payload;

    yield call(
        AsyncStorage.setItem,
        USER_INFO_STORAGE_KEY,
        JSON.stringify({
            user: {
                name,
                username: name,
                type: 'STUDENT',
                token: 'test_token',
            },
            classroomName: 'Hello',
        })
    );

    yield call(fetchAuthenticationInfo);
}

function* registerTeacher(
    action: ReturnType<typeof actions.user.registerTeacher>
) {
    const { name, email } = action.payload;

    yield call(
        AsyncStorage.setItem,
        USER_INFO_STORAGE_KEY,
        JSON.stringify({
            user: {
                name,
                username: email,
                type: 'TEACHER',
                token: 'test_token',
            },
            classroomName: 'Hello',
        })
    );

    yield call(fetchAuthenticationInfo);
}

function* signOut() {}
