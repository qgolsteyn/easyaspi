import {
    NavigationActions,
    NavigationContainerComponent,
} from 'react-navigation';
import { takeLatest } from 'redux-saga/effects';

import { actions } from '../reducers';

export function* initNav(): Generator<any, void, any> {
    yield takeLatest(actions.nav.setNavigator, startListeningToNavActions);
    yield takeLatest(actions.nav.goToScreen, goToScreen);
}

let navigator: NavigationContainerComponent;
function* startListeningToNavActions(
    action: ReturnType<typeof actions.nav.setNavigator>,
): Generator<any, void, any> {
    navigator = action.payload.navigator;
}

function* goToScreen(
    action: ReturnType<typeof actions.nav.goToScreen>,
): Generator<any, void, any> {
    if (navigator) {
        navigator.dispatch(
            NavigationActions.navigate({ routeName: action.payload.screen }),
        );
    }
}
