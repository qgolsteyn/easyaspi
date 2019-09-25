/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

// We specify the shape of the state in an interface
export interface IDemoState {
    problem: string;
    solution: string;
}

// And provide a default value for initialization
const defaultState: IDemoState = {
    problem: 'Waiting',
    solution: 'Waiting',
};

// Selectors are responsible for getting values in the state
export const demoSelectors = {
    getProblem: (state: { demo: IDemoState }) => state.demo.problem,
    getSolution: (state: { demo: IDemoState }) => state.demo.solution,
};

// And actions allow us to mutate the state
export const demoActions = {
    changeDemoText: createAction(
        'demo_SET_PROBLEM',
        resolve => (problem: string, solution: string) =>
            resolve({ problem, solution })
    ),
};

export type DemoAction = ActionType<typeof demoActions>;

// The reducer is responsible for changing the state based on actions received
export const demoReducer = produce((draft: IDemoState, action: DemoAction) => {
    // We switch based on the type of action
    switch (action.type) {
        case getType(demoActions.changeDemoText): {
            const { problem, solution } = action.payload;

            draft.problem = problem;
            draft.solution = solution;

            return draft;
        }
        default: {
            // Redux requires us to return the state in case the action does not match
            return draft;
        }
    }
}, defaultState);
