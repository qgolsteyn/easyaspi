import { AsyncStorage } from 'react-native';
import { takeLatest, put, call, delay } from 'redux-saga/effects';

import { IUser, UserType, userSerializer, IUserCreation } from 'shared';

import * as Google from 'expo-google-app-auth';

import { actions } from '../reducers';
import { baseApi } from './api';
import { AxiosResponse } from 'axios';

const USER_INFO_STORAGE_KEY = 'user_info';

export default function* init() {
    yield call(fetchAuthenticationInfo);

    yield takeLatest(actions.user.login, login);
    yield takeLatest(actions.user.registerTeacher, registerTeacher);
    yield takeLatest(actions.user.registerStudent, registerStudent);
}

function* fetchAuthenticationInfo() {
    const user = JSON.parse(
        yield call(AsyncStorage.getItem, USER_INFO_STORAGE_KEY)
    );

    if (user) {
        if (user.userType === UserType.STUDENT) {
            yield put(actions.user.setCurrentUser(user));
            yield put(actions.nav.goToScreen('Student'));
        } else if (user.userType === UserType.TEACHER) {
            yield put(actions.user.setCurrentUser(user));
            yield put(actions.nav.goToScreen('Teacher'));
        } else {
            yield put(actions.user.setLoading(false));
        }
    } else {
        yield put(actions.user.setLoading(false));
    }
}

function* saveAuthenticationInfo(user: IUser) {
    yield call(
        AsyncStorage.setItem,
        USER_INFO_STORAGE_KEY,
        JSON.stringify(user)
    );
}

function* login() {
    yield put(actions.user.setLoading(true));

    const googleResonse = (yield call(loginWithGoogle)) as Google.GoogleUser;
    if (googleResonse === undefined) {
        yield put(actions.user.setLoading(false));
        return;
    }

    try {
        const userResponse = (yield call(
            [baseApi, baseApi.get],
            `/users/${googleResonse.id}`
        )) as AxiosResponse;

        const user = userSerializer.parse(userResponse.data);
        if (user) {
            yield call(saveAuthenticationInfo, user);
            yield call(fetchAuthenticationInfo);
        } else {
            yield put(actions.user.setLoading(false));
        }
    } catch (e) {
        yield put(actions.nav.goToScreen('UserSelection'));
        yield delay(500);
        yield put(
            actions.user.setCurrentUser({
                name: googleResonse.name,
                authToken: googleResonse.id,
            })
        );
    }
}

function* registerStudent(
    action: ReturnType<typeof actions.user.registerStudent>
) {
    const values = action.payload;

    yield put(actions.user.setLoading(true));

    try {
        const userResponse = (yield call([baseApi, baseApi.post], '/users', {
            classroomName: values.classroomName,
            classroomPasscode: values.classroomPasscode,
            user: {
                name: values.name,
                userType: UserType.STUDENT,
                virtualClassroomUid: 'placeholder',
                authToken: values.authToken,
            },
        } as IUserCreation)) as AxiosResponse;

        const user = userSerializer.parse(userResponse.data);
        if (user) {
            yield call(saveAuthenticationInfo, user);
            yield call(fetchAuthenticationInfo);
        } else {
            alert('Error');
        }
    } catch (e) {
        alert(e);
        yield put(actions.user.setLoading(false));
        return;
    }
}

function* registerTeacher(
    action: ReturnType<typeof actions.user.registerTeacher>
) {
    const values = action.payload;

    yield put(actions.user.setLoading(true));

    try {
        const userResponse = (yield call([baseApi, baseApi.post], '/users', {
            classroomName: values.classroomName,
            classroomPasscode: values.classroomPasscode,
            user: {
                name: values.name,
                userType: UserType.TEACHER,
                virtualClassroomUid: 'placeholder',
                authToken: values.authToken,
            },
        } as IUserCreation)) as AxiosResponse;

        const user = userSerializer.parse(userResponse.data);
        if (user) {
            yield call(saveAuthenticationInfo, user);
            yield call(fetchAuthenticationInfo);
        } else {
            alert('Error');
        }
    } catch (e) {
        alert(e);
        yield put(actions.user.setLoading(false));
        return;
    }
}

function* loginWithGoogle() {
    try {
        const result = yield call(Google.logInAsync, {
            clientId:
                '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com',
            androidClientId:
                '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            return result.user as Google.GoogleUser;
        } else {
            return undefined;
        }
    } catch (e) {
        alert('Oops! Login failed!');
    }
}
