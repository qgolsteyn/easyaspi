import { call } from 'redux-saga/effects';

import { getAccessToken } from './auth';
import { baseApi } from './url';

export function* getNextMathProblem() {
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
                }
            )).data;
            return problem;
        } catch (e) {
            alert(e);
            return undefined;
        }
    }

    return undefined;
}
