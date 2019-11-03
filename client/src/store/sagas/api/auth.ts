import { IClassroom, IUser } from '@shared/index';
import { AsyncStorage } from 'react-native';
import { call, put, select } from 'redux-saga/effects';
import { actions, selectors } from '../../reducers';
import { baseApi } from './url';


const ACCESS_TOKEN_KEY = 'access_token';

export function* auth(idToken: string) {
    try {
        const { accessToken, user } = (yield call(
            [baseApi, baseApi.post],
            '/auth',
            { idToken }
        )).data as { accessToken: string; user: IUser };

        yield call(saveAccessToken, accessToken);

        return user;
    } catch (e) {
        handleError(e);
        return undefined;
    }
}

export function* register(user: IUser, classroom: IClassroom) {
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
                }
            )).data as { accessToken: string; user: IUser };

            yield call(saveAccessToken, result.accessToken);

            return result.user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        alert('Error : could not retrieve the access token')
        return undefined;
    }
}

export function* getUser() {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const user = (yield call([baseApi, baseApi.get], '/user/current', {
                headers: { Authorization: `Bearer ${accessToken}` },
            })).data as { user: IUser };
            return user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        alert('Error : could not retrieve the access token')
        return undefined;
    }
}

export function* getAccessToken() {
    const accessToken = (yield select(selectors.user.getAccessToken)) as string;

    if (accessToken.length === 0) {
        return (yield call(AsyncStorage.getItem, ACCESS_TOKEN_KEY)) as
            | string
            | undefined;
    } else {
        return accessToken;
    }
}

function* saveAccessToken(accessToken: string) {
    yield put(actions.user.setAccessToken(accessToken));
    yield call(AsyncStorage.setItem, ACCESS_TOKEN_KEY, accessToken);
}

export function* handleError(e: Error) {
    alert(e);
}
