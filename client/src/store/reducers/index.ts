import { combineReducers } from 'redux';

import { navActions } from './navigation';
import { problemActions, problemReducer, problemSelectors } from './problems';
import { userActions, userReducer, userSelectors } from './user';

export const actions = {
    nav: navActions,
    problems: problemActions,
    user: userActions,
};

export const reducers = combineReducers({
    problems: problemReducer,
    user: userReducer,
});

export const selectors = {
    problems: problemSelectors,
    user: userSelectors,
};
