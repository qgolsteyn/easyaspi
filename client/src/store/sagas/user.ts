import { AsyncStorage } from 'react-native';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { actions } from '../reducers';

const USER_INFO_STORAGE_KEY = 'user_info';

export default function* init() {
    yield call(fetchAuthenticationInfo);
}

function* fetchAuthenticationInfo() {
    const userInfo = yield call(AsyncStorage.getItem, USER_INFO_STORAGE_KEY);

    if (userInfo) {
        yield put(actions.user.setUser(userInfo.user, userInfo.classroomName));
    } else {
        yield put(actions.user.setUser(undefined, undefined));
    }
}

function* loginTeacher() {}

function* loginStudent() {}

function* registerStudent() {}

function* registerTeacher() {}

function* signOut() {}
