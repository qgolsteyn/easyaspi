import { call } from 'redux-saga/effects';

import { IUser } from '@shared/index';

import { getAccessToken } from './auth';
import { baseApi } from './url';

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
                    },
                },
            )) as { data: IUser[] }).data;
            return students;
        } catch (e) {
            alert(e);
            return undefined;
        }
    }

    return undefined;
}
