/**
 * Reducer and actions for showing math problems to students
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IClassroom, IClassroomStatistic, IUser } from '@shared/index';

// We specify the shape of the state in an interface
export interface ITeacherState {
    loading: boolean;
    classroomInfo: IClassroom;
    students: IUser[];
    statistics: IClassroomStatistic;
    currentStudent: string;
}

// And provide a default value for initialization
const defaultState: ITeacherState = {
    classroomInfo: {
        name: '',
        numDailyProblems: 0,
        onlineResources: '',
        passcode: '',
        problemsForToday: [],
    },
    currentStudent: '',
    loading: false,
    statistics: {
        allStudents: {},
        numDailyAttempts: 0,
        numDailyCorrectAnswers: 0,
        problemTypeStats: {},
        studentsCompleted: 0,
    },
    students: [],
};

// Selectors are responsible for getting values in the state
export const teacherSelectors = {
    getClassroomInfo: (state: { teacher: ITeacherState }) =>
        state.teacher.classroomInfo,
    getCurrentStudent: (state: { teacher: ITeacherState }) =>
        state.teacher.students.find(
            student => student.id === state.teacher.currentStudent,
        ),
    getCurrentStudentStatistics: (state: { teacher: ITeacherState }) =>
        state.teacher.statistics.allStudents[state.teacher.currentStudent],
    getNumberOfStudents: (state: { teacher: ITeacherState }) =>
        state.teacher.students.length,
    getNumberOfStudentsDone: (state: { teacher: ITeacherState }) =>
        state.teacher.statistics.studentsCompleted,
    getStudents: (state: { teacher: ITeacherState }) => state.teacher.students,
    isLoading: (state: { teacher: ITeacherState }) => state.teacher.loading,
};

// And actions allow us to mutate the state
export const teacherActions = {
    reset: createAction('reset'),
    setCurrentStudent: createAction(
        'teacher_SET_STUDENT',
        resolve => (studentId: string) => resolve({ studentId }),
    ),
    setLoading: createAction('teacher_LOADING', resolve => (loading: boolean) =>
        resolve({ loading }),
    ),
    setTeacherInfo: createAction(
        'teacher_SET',
        resolve => (
            classroomInfo: IClassroom,
            students: IUser[],
            statistics: IClassroomStatistic,
        ) => resolve({ classroomInfo, students, statistics }),
    ),
    update: createAction(
        'teacher_UPDATE',
        resolve => (classroomInfo: IClassroom) => resolve({ classroomInfo }),
    ),
};

export type TeacherAction = ActionType<typeof teacherActions>;

// The reducer is responsible for changing the state based on actions received
export const teacherReducer = produce(
    (draft: ITeacherState, action: TeacherAction) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(teacherActions.setTeacherInfo): {
                const { classroomInfo, students, statistics } = action.payload;
                draft.classroomInfo = classroomInfo;
                draft.students = students;
                draft.statistics = statistics;
                break;
            }
            case getType(teacherActions.setCurrentStudent): {
                draft.currentStudent = action.payload.studentId;
                break;
            }
            case getType(teacherActions.setLoading): {
                draft.loading = action.payload.loading;
                break;
            }
            case getType(teacherActions.reset): {
                return defaultState;
            }
        }

        // Redux requires us to return the state in case the action does not match
        return draft;
    },
    defaultState,
);
