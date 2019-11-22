import {
    NavigationActions,
    NavigationContainerComponent,
} from 'react-navigation';
import { put, takeLatest } from 'redux-saga/effects';

import * as errors from '@shared/errors';

import { actions } from '../reducers';

export function* initNav(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.setNavigator, startListeningToNavActions);
    yield takeLatest(actions.nav.goBack, goBack);
    yield takeLatest(actions.nav.goToScreen, goToScreen);
    yield takeLatest(actions.nav.error, error);
    yield takeLatest(actions.nav.setTemplateError, handleTemplateError);
}

let navigator: NavigationContainerComponent;
function* startListeningToNavActions(
    action: ReturnType<typeof actions.nav.setNavigator>,
): Generator<unknown, void, unknown> {
    navigator = action.payload.navigator;
}

function* goBack(): Generator<unknown, void, unknown> {
    if (navigator) {
        navigator.dispatch(NavigationActions.back());
    }
}

function* goToScreen(
    action: ReturnType<typeof actions.nav.goToScreen>,
): Generator<unknown, void, unknown> {
    if (navigator) {
        navigator.dispatch(
            NavigationActions.navigate({ routeName: action.payload.screen }),
        );
    }
}

function* error(): Generator<unknown, void, unknown> {
    if (navigator) {
        navigator.dispatch(NavigationActions.navigate({ routeName: 'Error' }));
    }
}

function* handleTemplateError(
    action: ReturnType<typeof actions.nav.setTemplateError>,
): Generator<unknown, void, unknown> {
    if (navigator) {
        switch (action.payload.errorId) {
            case errors.NO_INTERNET: {
                yield put(
                    actions.nav.error(
                        'noWifi',
                        'No internet',
                        'We cannot connect to the internet, try again later.',
                        'Back',
                    ),
                );
                break;
            }
            case errors.AUTH: {
                yield put(
                    actions.nav.error(
                        'default',
                        'You were logged out',
                        'Your login information are no longer valid, you will need to login again',
                        'Ok',
                    ),
                );
                break;
            }
            case errors.WRONG_CLASS_INFO: {
                yield put(
                    actions.nav.error(
                        'default',
                        "We can't register you!",
                        'The classroom name and passcode is not a valid classroom.',
                        'Back',
                    ),
                );
                break;
            }
            case errors.DUPLICATE_CLASSROOM: {
                yield put(
                    actions.nav.error(
                        'default',
                        "We can't register you!",
                        'The classroom name is already taken.',
                        'Back',
                    ),
                );
                break;
            }
            case errors.INTERNAL:
            default: {
                yield put(
                    actions.nav.error(
                        'default',
                        'Something went wrong',
                        'We are not sure what happened, please try again later.',
                        'Back',
                    ),
                );
                break;
            }
        }
    }
}
