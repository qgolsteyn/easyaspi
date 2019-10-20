/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType } from 'typesafe-actions';
import { NavigationContainerComponent } from 'react-navigation';

export const navActions = {
    setNavigator: createAction(
        'nav_SET_NAVIGATOR',
        resolve => (navigator: NavigationContainerComponent) =>
            resolve({ navigator })
    ),
    goToScreen: createAction('nav_GOTO_SCREEN', resolve => (screen: string) =>
        resolve({ screen })
    ),
};

export type NavActions = ActionType<typeof navActions>;
