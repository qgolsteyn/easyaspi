import { AsyncStorage } from 'react-native';
import { call, put, select } from 'redux-saga/effects';

import { IClassroom, IUser } from '@shared/index';
import { actions, selectors } from '../../reducers';
import { baseApi } from './url';

const ACCESS_TOKEN_KEY = 'access_token';

export function* auth(idToken: string): Generator<any, IUser | undefined, any> {
    try {
        const { accessToken, user } = (yield call(
            [baseApi, baseApi.post],
            '/auth',
            { idToken },
        )).data as { accessToken: string; user: IUser };

        yield call(saveAccessToken, accessToken);

        return user;
    } catch (e) {
        alert(e);
        return undefined;
    }
}

export function* register(
    user: IUser,
    classroom: IClassroom,
): Generator<any, IUser | undefined, any> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const result = (yield call(
                [baseApi, baseApi.post],
                '/user/register',
                {
                    classroom,
                    user,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            )).data as { accessToken: string; user: IUser };

            yield call(saveAccessToken, result.accessToken);

            return result.user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        return undefined;
    }
}

export function* getUser(): Generator<any, IUser | undefined, any> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const { user } = (yield call(
                [baseApi, baseApi.get],
                '/user/current',
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            )).data as { user: IUser };
            return user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        return undefined;
    }
}

export function* getAccessToken(): Generator<any, string | undefined, any> {
    const accessToken = (yield select(selectors.user.getAccessToken)) as string;

    if (accessToken) {
        return (yield call(AsyncStorage.getItem, ACCESS_TOKEN_KEY)) as
            | string
            | undefined;
    } else {
        return accessToken;
    }
}

function* saveAccessToken(accessToken: string): Generator<any, void, any> {
    yield put(actions.user.setAccessToken(accessToken));
    yield call(AsyncStorage.setItem, ACCESS_TOKEN_KEY, accessToken);
}
