import { call } from 'redux-saga/effects';

import { IAchievement, IStudentStatistic } from '@shared/index';

import { getAccessToken } from './auth';
import { handleError } from './errors';
import { baseApi } from './url';

export function* getStatistics(): Generator<
    unknown,
    IStudentStatistic | undefined,
    unknown
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const statistics = ((yield call(
                [baseApi, baseApi.get],
                `/mastery/student/statistics`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            )) as { data: IStudentStatistic }).data;
            return statistics;
        } catch (e) {
            yield call(handleError, e);
            return undefined;
        }
    }

    return undefined;
}

export function* getAchievements(): Generator<
    unknown,
    IAchievement[] | undefined,
    {}
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const achievements = ((yield call(
                [baseApi, baseApi.get],
                `/achievements`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            )) as { data: IAchievement[] }).data;
            return achievements;
        } catch (e) {
            yield call(handleError, e);
            return undefined;
        }
    }

    return undefined;
}
