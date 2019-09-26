/**
 * Demo saga; used for demonstration purposes
 */

import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { problemSerializer } from 'shared';

import { api } from '../api';
import { actions } from '../../reducers';

export function* demoStart() {
    const response = (yield call(
        [api, api.get],
        '/math/problem'
    )) as AxiosResponse;

    const problems = problemSerializer.parseAsArray(response.data);

    yield put(
        actions.demo.setProblem(problems[0].problem, problems[0].solution[0])
    );
}
