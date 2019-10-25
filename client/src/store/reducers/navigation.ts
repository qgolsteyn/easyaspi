/**
 * Demo reducer and actions for reference purposes
 */

import { NavigationContainerComponent } from 'react-navigation';
import { ActionType, createAction } from 'typesafe-actions';

export const navActions = {
    goToScreen: createAction('nav_GOTO_SCREEN', resolve => (screen: string) =>
        resolve({ screen })
    ),
    setNavigator: createAction(
        'nav_SET_NAVIGATOR',
        resolve => (navigator: NavigationContainerComponent) =>
            resolve({ navigator })
    ),
};

export type NavActions = ActionType<typeof navActions>;
