/**
 * Reducer and actions for showing math problems to students
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IAchievement, IClassroom, IStudentStatistic } from '@shared/index';

// We specify the shape of the state in an interface
export interface IStudentState {
    loading: boolean;
    classroomInfo: IClassroom;
    statistics: IStudentStatistic;
    achievements: IAchievement[];
}

// And provide a default value for initialization
const defaultState: IStudentState = {
    achievements: [],
    classroomInfo: {
        name: '',
        numDailyProblems: 0,
        onlineResources: '',
        passcode: '',
        problemsForToday: [],
    },
    loading: false,
    statistics: {
        numDailyAttempts: 0,
        numDailyCorrectAnswers: 0,
        totalLifetimeAttempts: 0,
        totalLifetimeCorrectAnswers: 0,
        totals: {},
    },
};

// Selectors are responsible for getting values in the state
export const studentSelectors = {
    getAchievements: (state: { student: IStudentState }) =>
        state.student.achievements,
    getActiveProblems: (state: { student: IStudentState }) =>
        state.student.classroomInfo,
    getHelpURL: (state: { student: IStudentState }) =>
        state.student.classroomInfo.onlineResources,
    getNumberOfDailyProblems: (state: { student: IStudentState }) =>
        state.student.classroomInfo.numDailyProblems,
    getStats: (state: { student: IStudentState }) => state.student.statistics,
    isLoading: (state: { student: IStudentState }) => state.student.loading,
};

// And actions allow us to mutate the state
export const studentActions = {
    reset: createAction('reset'),
    setLoading: createAction(
        'student_SET_LOADING',
        resolve => (loading: boolean) => resolve({ loading }),
    ),
    setStudentInfo: createAction(
        'student_SET',
        resolve => (
            classroomInfo: IClassroom,
            achievements: IAchievement[],
            statistics: IStudentStatistic,
        ) => resolve({ classroomInfo, achievements, statistics }),
    ),
};

export type StudentActions = ActionType<typeof studentActions>;

// The reducer is responsible for changing the state based on actions received
export const studentReducer = produce(
    (draft: IStudentState, action: StudentActions) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(studentActions.setStudentInfo): {
                const {
                    classroomInfo,
                    achievements,
                    statistics,
                } = action.payload;
                draft.classroomInfo = classroomInfo;
                draft.achievements = achievements;
                draft.statistics = statistics;
                break;
            }
            case getType(studentActions.reset): {
                return defaultState;
            }
            case getType(studentActions.setLoading): {
                draft.loading = action.payload.loading;
                break;
            }
        }

        // Redux requires us to return the state in case the action does not match
        return draft;
    },
    defaultState,
);
