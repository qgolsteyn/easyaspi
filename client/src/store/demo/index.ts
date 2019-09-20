/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

export interface IDemoState {
    demoText: string;
}

const defaultState: IDemoState = {
    demoText: 'Press here',
};

export const demoSelectors = {
    getText: (state: { demo: IDemoState }) => state.demo.demoText,
};

export const demoActions = {
    changeDemoText: createAction(
        'demo_CHANGE_TEXT',
        resolve => (text: string) => resolve({ text })
    ),
};

export type DemoAction = ActionType<typeof demoActions>;

export const demoReducer = produce((draft: IDemoState, action: DemoAction) => {
    switch (action.type) {
        case getType(demoActions.changeDemoText): {
            const { text } = action.payload;

            draft.demoText = text;

            return draft;
        }
        default: {
            return draft;
        }
    }
}, defaultState);
