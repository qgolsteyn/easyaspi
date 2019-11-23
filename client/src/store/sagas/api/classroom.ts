import { call } from 'redux-saga/effects';

import { IClassroom, IUser } from '@shared/index';

import { getAccessToken } from './auth';
import { handleError } from './errors';
import { baseApi } from './url';

export function* getClassroomInfo(): Generator<
    unknown,
    IClassroom | undefined,
    unknown
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const classroom = ((yield call(
                [baseApi, baseApi.get],
                `/classroom`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            )) as { data: IClassroom }).data;
            return classroom;
        } catch (e) {
            yield call(handleError, e);
            return undefined;
        }
    }

    return undefined;
}

export function* getClassroomStudents(): Generator<
    unknown,
    IUser[] | undefined,
    {}
> {
    const accessToken = (yield call(getAccessToken)) as string | undefined;

    if (accessToken) {
        try {
            const students = ((yield call(
                [baseApi, baseApi.get],
                `/classroom/students`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Cache-Control': 'no-cache',
                        Expires: '0',
                        Pragma: 'no-cache',
                    },
                },
            )) as { data: IUser[] }).data;
            return students;
        } catch (e) {
            yield call(handleError, e);
            return undefined;
        }
    }

    return undefined;
}
