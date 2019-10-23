import { AsyncStorage } from 'react-native';
import { takeLatest, put, call, delay, select } from 'redux-saga/effects';

import { UserType, IUserCreation } from '@shared';

import * as Google from 'expo-google-app-auth';

import { actions, selectors } from '../reducers';
import { baseApi } from './api';
import { AxiosResponse } from 'axios';
import { Notifications } from 'expo';

const AUTH_TOKEN_KEY = 'auth_token';

export default function* init() {
    yield call(fetchUser);

    yield takeLatest(actions.user.login, login);
    yield takeLatest(actions.user.register, register);
    yield takeLatest(actions.user.setAuthToken, saveAuthenticationInfo);
}

function* fetchUser() {
    const authToken = JSON.parse(
        yield call(AsyncStorage.getItem, AUTH_TOKEN_KEY)
    );

    if (!authToken || !(yield call(getUserInfo, authToken))) {
        yield put(actions.user.setLoading(false));
    }
}

function* saveAuthenticationInfo(
    action: ReturnType<typeof actions.user.setAuthToken>
) {
    yield call(
        AsyncStorage.setItem,
        AUTH_TOKEN_KEY,
        JSON.stringify(action.payload.authToken)
    );
}

function* login() {
    yield put(actions.user.setLoading(true));

    const googleResponse = (yield call(loginWithGoogle)) as Google.GoogleUser;
    if (googleResponse === undefined) {
        yield put(actions.user.setLoading(false));
        return;
    }

    yield put(actions.user.setAuthToken(googleResponse.id));

    const isFound = yield call(getUserInfo, googleResponse.id);

    if (!isFound) {
        yield put(actions.nav.goToScreen('UserSelection'));
        yield delay(500);
        yield put(actions.user.setLoading(false));
        yield put(
            actions.user.setCurrentUser({
                name: googleResponse.name,
            })
        );
    }
}

function* getUserInfo(authToken: string) {
    try {
        const userResponse = (yield call(
            [baseApi, baseApi.get],
            `/users/auth/${authToken}`
        )) as AxiosResponse;

        const { id, user } = userResponse.data;

        if (user) {
            yield put(actions.user.setCurrentUserId(id));
            yield put(actions.user.setCurrentUser(user));
            if (user.userType === UserType.STUDENT) {
                yield put(actions.problems.fetchNextProblem());
                yield put(actions.nav.goToScreen('Student'));
            } else if (user.userType === UserType.TEACHER) {
                yield put(actions.classroom.fetchClassroom());
                yield put(actions.nav.goToScreen('Teacher'));
            }
            return true;
        }
    } catch (e) {}
}

function* register(action: ReturnType<typeof actions.user.register>) {
    const values = action.payload;

    yield put(actions.user.setLoading(true));

    const authToken = (yield select(selectors.user.getAuthToken)) as string;
    if (!authToken) {
        yield put(actions.user.setLoading(true));
        yield put(actions.nav.goToScreen('Welcome'));
        return;
    }

    try {
        const userResponse = (yield call(
            [baseApi, baseApi.post],
            '/users/auth/register',
            {
                authToken: authToken,
                pushToken: yield call(Notifications.getExpoPushTokenAsync),
                classroomName: values.classroomName,
                classroomPasscode: values.classroomPasscode,
                user: {
                    id: 'placeholder',
                    name: values.name,
                    userType: values.userType,
                    virtualClassroomUid: 'placeholder',
                },
            } as IUserCreation
        )) as AxiosResponse;

        const { id, user } = userResponse.data;

        if (user) {
            yield put(actions.user.setCurrentUserId(id));
            yield put(actions.user.setCurrentUser(user));
            if (user.userType === UserType.STUDENT) {
                yield put(actions.problems.fetchNextProblem());
                yield put(actions.nav.goToScreen('Student'));
            } else if (user.userType === UserType.TEACHER) {
                yield put(actions.classroom.fetchClassroom());
                yield put(actions.nav.goToScreen('Teacher'));
            }
        } else {
            alert('Invalid user format');
            yield put(actions.user.setLoading(false));
        }
    } catch (e) {
        alert(e);
        yield put(actions.user.setLoading(false));
    }
}

function* loginWithGoogle() {
    try {
        const result = yield call(Google.logInAsync, {
            clientId:
                '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com',
            androidClientId:
                '1045897314106-fds1dsf16nesvidoscda541jq3rt2622.apps.googleusercontent.com',
            androidStandaloneAppClientId:
                '1045897314106-9mrv3no49mvrufejeptit1ubn1vl2obt.apps.googleusercontent.com',
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
