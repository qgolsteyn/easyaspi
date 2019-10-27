import { AxiosResponse } from 'axios';
import { Notifications } from 'expo';
import * as Google from 'expo-google-app-auth';
import { AsyncStorage } from 'react-native';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import {
    ANDROID_CLIENT_ID,
    ANDROID_STANDALONE_CLIENT_ID,
    CLIENT_ID,
} from 'react-native-dotenv';

import { actions, selectors } from '../reducers';
import { baseApi } from './api';

export default function* init() {
    yield takeLatest(actions.user.login, login);
    yield takeLatest(actions.user.register, register);
}

function* login() {
    yield put(actions.user.setLoading(true));

    const idToken = (yield call(loginWithGoogle)) as Google.GoogleUser;

    yield call([baseApi, baseApi.post], `/auth`, { idToken });

    yield put(actions.user.setLoading(false));
}

function* register(action: ReturnType<typeof actions.user.register>) {}

function* loginWithGoogle() {
    try {
        const result = (yield call(Google.logInAsync, {
            androidClientId: ANDROID_CLIENT_ID,
            androidStandaloneAppClientId: ANDROID_STANDALONE_CLIENT_ID,
            clientId: CLIENT_ID,
            scopes: ['profile', 'email'],
        })) as Google.LogInResult;

        if (result.type === 'success') {
            return result.idToken;
        } else {
            return undefined;
        }
    } catch (e) {
        alert('Oops! Login failed!');
        return undefined;
    }
}
