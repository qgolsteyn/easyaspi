/**
 * Reducer and actions for showing math problems to students
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

export enum ProblemSetState {
    LOADING,
    NOT_STARTED,
    IN_PROGRESS,
    DONE,
}

export interface IProblem {
    problemType: string;
    prompt: string;
    operators: string[];
    operands: number[];
    answers: string[];
    solution: string;
    solved: boolean;
}

// We specify the shape of the state in an interface
export interface IProblemState {
    problemSetCount: number;
    currentProblem: number;
    problems: Array<IProblem | null>;
}

// And provide a default value for initialization
const defaultState: IProblemState = {
    currentProblem: 0,
    problemSetCount: 10,
    problems: [null],
};

// Selectors are responsible for getting values in the state
export const problemSelectors = {
    getCurrentProblem: (state: { problems: IProblemState }) =>
        state.problems.problems[state.problems.currentProblem],
    getCurrentProblemNumber: (state: { problems: IProblemState }) =>
        state.problems.currentProblem + 1,
    getNumberOfProblems: (state: { problems: IProblemState }) =>
        state.problems.problemSetCount,
    getProblemSetState: (state: { problems: IProblemState }) =>
        state.problems.currentProblem === 0
            ? ProblemSetState.NOT_STARTED
            : state.problems.currentProblem < state.problems.problemSetCount
            ? ProblemSetState.IN_PROGRESS
            : ProblemSetState.DONE,
    isLoading: (state: { problems: IProblemState }) =>
        state.problems.problems[state.problems.currentProblem] === null,
};

// And actions allow us to mutate the state
export const problemActions = {
    fetchNextProblem: createAction('problem_FETCH_NEXT_PROBLEM'),
    goToNextProblem: createAction('problem_NEXT_PROBLEM'),
    reset: createAction('reset'),
    setProblem: createAction(
        'problem_SET_PROBLEM',
        resolve => (problem: IProblem) => resolve({ problem }),
    ),
    setProblemSetState: createAction(
        'problem_SET_PROBLEM_SET_STATE',
        resolve => (currentProblem: number, problemSetCount: number) =>
            resolve({ currentProblem, problemSetCount }),
    ),
    solveCurrentProblem: createAction(
        'problem_SOLVE_CURRENT_PROBLEM',
        resolve => (success: boolean) => resolve({ success }),
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
                if (draft.problems.length <= draft.problemSetCount) {
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
                const problem = draft.problems[draft.currentProblem];
                if (problem !== null) {
                    problem.solved = true;
                }
                break;
            }
            case getType(problemActions.setProblemSetState): {
                const { currentProblem, problemSetCount } = action.payload;

                draft.currentProblem = currentProblem;
                draft.problemSetCount = problemSetCount;
                draft.problems = new Array(currentProblem + 1).fill(null);
                break;
            }
            case getType(problemActions.reset): {
                return defaultState;
            }
        }

        // Redux requires us to return the state in case the action does not match
        return draft;
    },
    defaultState,
);
