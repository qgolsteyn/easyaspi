import { AxiosError } from 'axios';
import { call } from 'redux-saga/effects';

import { IProblem } from '@client/store/reducers/problems';

import { getAccessToken } from './auth';
import { handleError } from './errors';
import { baseApi } from './url';

const BAD_REQUEST = 400;

export function* getNextMathProblem(): Generator<
    unknown,
    IProblem | undefined,
    {}
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const problem = ((yield call(
                [baseApi, baseApi.get],
                `/math/nextProblem`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            )) as { data: IProblem }).data;
            return problem;
        } catch (e) {
            const response = (e as AxiosError).response;
            if (!response || response.status !== BAD_REQUEST) {
                yield call(handleError, e);
            }
            return undefined;
        }
    }

    return undefined;
}

export function* notifySuccessFailure(
    problemType: string,
    success: boolean,
): Generator<unknown, void, unknown> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            yield call(
                [baseApi, baseApi.post],
                `/mastery/result`,
                {
                    isSuccess: success,
                    problemType,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            );
        } catch (e) {
            yield call(handleError, e);
        }
    }
}
