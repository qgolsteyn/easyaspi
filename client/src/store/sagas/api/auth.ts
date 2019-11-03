import { IClassroom, IUser } from '@shared/index';
import { AsyncStorage } from 'react-native';
import { call, put, select } from 'redux-saga/effects';
import { actions, selectors } from '../../reducers';
import { baseApi } from './url';

const ACCESS_TOKEN_KEY = 'access_token';

export function* auth(
    idToken: string,
): Generator<unknown, IUser | undefined, { data: {} }> {
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
): Generator<unknown, IUser | undefined, unknown> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const result = ((yield call(
                [baseApi, baseApi.post],
                '/user/register',
                {
                    classroom,
                    user,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            )) as { data: { accessToken: string; user: IUser } }).data;

            yield call(saveAccessToken, result.accessToken);

            return result.user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        alert('Error : could not retrieve the access token');
        return undefined;
    }
}

export function* getUser(): Generator<unknown, IUser | undefined, {}> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const user = ((yield call([baseApi, baseApi.get], '/user/current', {
                headers: { Authorization: `Bearer ${accessToken}` },
            })) as { data: IUser }).data;
            return user;
        } catch (e) {
            alert(e);
            return undefined;
        }
    } else {
        return undefined;
    }
}

export function* getAccessToken(): Generator<
    unknown,
    string | undefined,
    string
> {
    const accessToken = (yield select(selectors.user.getAccessToken)) as string;

    if (accessToken) {
        return (yield call(AsyncStorage.getItem, ACCESS_TOKEN_KEY)) as
            | string
            | undefined;
    } else {
        return accessToken;
    }
}

function* saveAccessToken(
    accessToken: string,
): Generator<unknown, void, unknown> {
    yield put(actions.user.setAccessToken(accessToken));
    yield call(AsyncStorage.setItem, ACCESS_TOKEN_KEY, accessToken);
}
