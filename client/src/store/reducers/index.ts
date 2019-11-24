import { combineReducers } from 'redux';

import { navActions, navReducer, navSelectors } from './navigation';
import { problemActions, problemReducer, problemSelectors } from './problems';
import { studentActions, studentReducer, studentSelectors } from './student';
import { teacherActions, teacherReducer, teacherSelectors } from './teacher';
import { userActions, userReducer, userSelectors } from './user';

export const actions = {
    nav: navActions,
    problems: problemActions,
    student: studentActions,
    teacher: teacherActions,
    user: userActions,
};

export const reducers = combineReducers({
    nav: navReducer,
    problems: problemReducer,
    student: studentReducer,
    teacher: teacherReducer,
    user: userReducer,
});

export const selectors = {
    nav: navSelectors,
    problems: problemSelectors,
    student: studentSelectors,
    teacher: teacherSelectors,
    user: userSelectors,
};
