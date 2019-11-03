import {
    NavigationActions,
    NavigationContainerComponent,
} from 'react-navigation';
import { takeLatest } from 'redux-saga/effects';

import { actions } from '../reducers';

export function* initNav(): Generator<unknown, void, unknown> {
    yield takeLatest(actions.nav.setNavigator, startListeningToNavActions);
    yield takeLatest(actions.nav.goToScreen, goToScreen);
}

let navigator: NavigationContainerComponent;
function* startListeningToNavActions(
    action: ReturnType<typeof actions.nav.setNavigator>,
): Generator<unknown, void, unknown> {
    navigator = action.payload.navigator;
}

function* goToScreen(
    action: ReturnType<typeof actions.nav.goToScreen>,
): Generator<unknown, void, unknown> {
    if (navigator) {
        navigator.dispatch(
            NavigationActions.navigate({ routeName: action.payload.screen }),
        );
    } else {
        alert('Navigator is undefined');
    }
}
