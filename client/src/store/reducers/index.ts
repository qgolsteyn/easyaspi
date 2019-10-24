import { combineReducers } from 'redux';

import {
    classroomActions,
    classroomReducer,
    classroomSelectors,
} from './classroom';
import { navActions } from './navigation';
import { problemActions, problemReducer, problemSelectors } from './problems';
import { userActions, userReducer, userSelectors } from './user';

export const actions = {
    classroom: classroomActions,
    nav: navActions,
    problems: problemActions,
    user: userActions,
};

export const reducers = combineReducers({
    classroom: classroomReducer,
    problems: problemReducer,
    user: userReducer,
});

export const selectors = {
    classroom: classroomSelectors,
    problems: problemSelectors,
    user: userSelectors,
};
