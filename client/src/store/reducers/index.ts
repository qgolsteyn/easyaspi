import { combineReducers } from 'redux';

import { demoReducer, demoActions, demoSelectors, IDemoState } from './demo';
import { navActions } from './navigation';
import { userReducer, userSelectors, userActions, IUserState } from './user';
import {
    problemReducer,
    problemSelectors,
    problemActions,
    IProblemState,
} from './problems';
import {
    classroomReducer,
    classroomSelectors,
    classroomActions,
    IClassroomState,
} from './classroom';

export interface IState {
    demo: IDemoState;
    user: IUserState;
    problems: IProblemState;
}

export const actions = {
    demo: demoActions,
    nav: navActions,
    user: userActions,
    problems: problemActions,
    classroom: classroomActions,
};

export const reducers = combineReducers({
    demo: demoReducer,
    user: userReducer,
    problems: problemReducer,
    classroom: classroomReducer,
});

export const selectors = {
    demo: demoSelectors,
    user: userSelectors,
    problems: problemSelectors,
    classroom: classroomSelectors,
};
