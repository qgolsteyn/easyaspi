/**
 * Demo saga; used for demonstration purposes
 */

import { call, put } from 'redux-saga/effects';

import { api } from '../api';
import { actions } from '../..';
import { IProblem } from '../../../../../types/model';
import { AxiosResponse } from 'axios';

export function* demoStart() {
    const problems = (yield call(
        [api, api.get],
        '/math/problem'
    )) as AxiosResponse<IProblem[]>;
    yield put(
        actions.demo.changeDemoText(
            problems.data[0].problem,
            problems.data[0].solution[0]
        )
    );
}
