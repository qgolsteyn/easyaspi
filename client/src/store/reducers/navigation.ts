import produce from 'immer';
import { NavigationContainerComponent } from 'react-navigation';
import { ActionType, createAction, getType } from 'typesafe-actions';

interface INavigationState {
    error: {
        type: string;
        name: string;
        description: string;
        action: string;
    };
}

// Selectors are responsible for getting values in the state
export const navSelectors = {
    getErrorInfo: (state: { nav: INavigationState }) => state.nav.error,
};

export const navActions = {
    error: createAction(
        'nav_ERROR',
        resolve => (
            type: 'noWifi' | 'default',
            name: string,
            description: string,
            action: string,
        ) => resolve({ type, name, description, action }),
    ),
    goBack: createAction('nav_GO_BACK'),
    goToScreen: createAction('nav_GOTO_SCREEN', resolve => (screen: string) =>
        resolve({ screen }),
    ),
    setNavigator: createAction(
        'nav_SET_NAVIGATOR',
        resolve => (navigator: NavigationContainerComponent) =>
            resolve({ navigator }),
    ),
    setTemplateError: createAction(
        'nav_TEMPLATE_ERROR',
        resolve => (errorId: string) => resolve({ errorId }),
    ),
};

const defaultState: INavigationState = {
    error: {
        action: '',
        description: '',
        name: '',
        type: '',
    },
};

export const navReducer = produce(
    (draft: INavigationState, action: NavActions) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(navActions.error): {
                draft.error = action.payload;
            }
        }

        // Redux requires us to return the state in case the action does not match
        return draft;
    },
    defaultState,
);

export type NavActions = ActionType<typeof navActions>;
