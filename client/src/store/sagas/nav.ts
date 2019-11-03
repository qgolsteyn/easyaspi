import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import { takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { actions } from '../reducers';


export default function* init() {
    yield takeLatest(
        getType(actions.nav.setNavigator),
        startListeningToNavActions
    );
    yield takeLatest(getType(actions.nav.goToScreen), goToScreen);
}

let navigator: NavigationContainerComponent;
function* startListeningToNavActions(
    action: ReturnType<typeof actions.nav.setNavigator>
) {
    navigator = action.payload.navigator;
}

function* goToScreen(action: ReturnType<typeof actions.nav.goToScreen>) {
    if (navigator) {
        navigator.dispatch(
            NavigationActions.navigate({ routeName: action.payload.screen })
        );
    }else{
        alert('Navigator is undefined')
    }
}
