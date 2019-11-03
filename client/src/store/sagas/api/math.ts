import { call } from 'redux-saga/effects';

import { IProblem } from '@client/store/reducers/problems';

import { getAccessToken } from './auth';
import { baseApi } from './url';

export function* getNextMathProblem(): Generator<
    any,
    IProblem | undefined,
    any
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const problem = (yield call(
                [baseApi, baseApi.get],
                `/math/nextProblem`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )).data;
            return problem;
        } catch (e) {
            alert(e);
            return undefined;
        }
    }

    return undefined;
}
