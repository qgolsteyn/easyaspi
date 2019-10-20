import { AsyncStorage } from 'react-native';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { actions } from '../reducers';
import { IUser } from '../reducers/user';

const USER_INFO_STORAGE_KEY = 'user_info';

export default function* init() {
    yield call(fetchAuthenticationInfo);

    yield takeLatest(actions.user.loginStudent, loginStudent);
    yield takeLatest(actions.user.registerTeacher, registerTeacher);
}

function* fetchAuthenticationInfo() {
    const user = JSON.parse(
        yield call(AsyncStorage.getItem, USER_INFO_STORAGE_KEY)
    ) as IUser;

    if (user) {
        yield put(actions.user.setCurrentUser(user));

        if (user.type === 'STUDENT') {
            yield put(actions.nav.goToScreen('Student'));
        } else if (user.type === 'TEACHER') {
            yield put(actions.nav.goToScreen('Teacher'));
        }
    } else {
        yield put(actions.user.setLoading(false));
    }
}

function* loginTeacher() {}

function* loginStudent(action: ReturnType<typeof actions.user.loginStudent>) {
    const { name, username } = action.payload;

    yield call(
        AsyncStorage.setItem,
        USER_INFO_STORAGE_KEY,
        JSON.stringify({
            name,
            username,
            type: 'STUDENT',
            token: 'test_token',
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
