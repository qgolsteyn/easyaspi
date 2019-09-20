/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

// We specify the shape of the state in an interface
export interface IDemoState {
    demoText: string;
}

// And provide a default value for initialization
const defaultState: IDemoState = {
    demoText: 'Press here',
};

// Selectors are responsible for getting values in the state
export const demoSelectors = {
    getText: (state: { demo: IDemoState }) => state.demo.demoText,
};

// And actions allow us to mutate the state
export const demoActions = {
    changeDemoText: createAction(
        'demo_CHANGE_TEXT',
        resolve => (text: string) => resolve({ text })
    ),
};

export type DemoAction = ActionType<typeof demoActions>;

// The reducer is responsible for changing the state based on actions received
export const demoReducer = produce((draft: IDemoState, action: DemoAction) => {
    // We switch based on the type of action
    switch (action.type) {
        case getType(demoActions.changeDemoText): {
            const { text } = action.payload;

            draft.demoText = text;

            return draft;
        }
        default: {
            // Redux requires us to return the state in case the action does not match
            return draft;
        }
    }
}, defaultState);
