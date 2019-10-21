/**
 * Reducer and actions for showing math problems to students
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

export interface IProblem {
    prompt: string;
    problem: string;
    solution: string;
    solved: boolean;
}

// We specify the shape of the state in an interface
export interface IProblemState {
    problemSetCount: number;
    solvedProblems: number;
    currentProblem: number;
    problems: Array<IProblem | null>;
}

// And provide a default value for initialization
const defaultState: IProblemState = {
    problemSetCount: 10,
    solvedProblems: 0,
    currentProblem: 0,
    problems: [],
};

// Selectors are responsible for getting values in the state
export const problemSelectors = {
    isLoading: (state: { problems: IProblemState }) =>
        state.problems.problems[state.problems.currentProblem] === null,
    getCurrentProblem: (state: { problems: IProblemState }) =>
        state.problems.problems[state.problems.currentProblem],
    getNumberOfProblems: (state: { problems: IProblemState }) =>
        state.problems.problemSetCount,
    getCurrentProblemNumber: (state: { problems: IProblemState }) =>
        state.problems.currentProblem + 1,
};

// And actions allow us to mutate the state
export const problemActions = {
    setProblem: createAction(
        'problem_SET_PROBLEM',
        resolve => (problem: IProblem) => resolve({ problem })
    ),
    fetchNextProblem: createAction('problem_FETCH_NEXT_PROBLEM'),
    goToNextProblem: createAction('problem_NEXT_PROBLEM'),
    solveCurrentProblem: createAction(
        'problem_SOLVE_CURRENT_PROBLEM',
        resolve => (successful: boolean) => resolve({ successful })
    ),
};

export type ProblemAction = ActionType<typeof problemActions>;

// The reducer is responsible for changing the state based on actions received
export const problemReducer = produce(
    (draft: IProblemState, action: ProblemAction) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(problemActions.setProblem): {
                const { problem } = action.payload;
                draft.problems[draft.problems.length - 1] = problem;
                break;
            }
            case getType(problemActions.fetchNextProblem): {
                if (draft.problems.length < draft.problemSetCount) {
                    draft.problems.push(null);
                }
                break;
            }
            case getType(problemActions.goToNextProblem): {
                if (draft.currentProblem < draft.problems.length) {
                    draft.currentProblem++;
                }
                break;
            }
            case getType(problemActions.solveCurrentProblem): {
                draft.problems[draft.currentProblem].solved = true;
                break;
            }
        }

        // Redux requires us to return the state in case the action does not match
        return draft;
    },
    defaultState
);
