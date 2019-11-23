/**
 * Reducer and actions for showing math problems to students
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IClassroom, IUser } from '@shared/index';

// We specify the shape of the state in an interface
export interface ITeacherState {
    classroomInfo: IClassroom;
    students: IUser[];
}

// And provide a default value for initialization
const defaultState: ITeacherState = {
    classroomInfo: {
        name: '',
        numDailyProblems: 0,
        onlineResources: [],
        passcode: '',
        problemsForToday: [],
    },
    students: [],
};

// Selectors are responsible for getting values in the state
export const teacherSelectors = {
    getStudents: (state: { teacher: ITeacherState }) => state.teacher.students,
};

// And actions allow us to mutate the state
export const teacherActions = {
    reset: createAction('reset'),
    setTeacherInfo: createAction(
        'teacher_SET',
        resolve => (classroomInfo: IClassroom, students: IUser[]) =>
            resolve({ classroomInfo, students }),
    ),
};

export type TeacherAction = ActionType<typeof teacherActions>;

// The reducer is responsible for changing the state based on actions received
export const teacherReducer = produce(
    (draft: ITeacherState, action: TeacherAction) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(teacherActions.setTeacherInfo): {
                const { classroomInfo, students } = action.payload;
                draft.classroomInfo = classroomInfo;
                draft.students = students;
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
