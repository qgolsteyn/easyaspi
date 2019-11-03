import { call } from 'redux-saga/effects';

import { IProblem } from '@client/store/reducers/problems';

import { getAccessToken } from './auth';
import { baseApi } from './url';

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
                    },
                },
            )) as { data: IProblem }).data;
            return problem;
        } catch (e) {
            alert(e);
            return undefined;
        }
    }

    return undefined;
}
