/**
 * Demo reducer and actions for reference purposes
 */

import produce from 'immer';
import { ActionType, createAction, getType } from 'typesafe-actions';

import { IClassroom } from '@shared/index';

// We specify the shape of the state in an interface
export interface IClassroomState {
    loading: boolean;
    classroom?: IClassroom;
}

// And provide a default value for initialization
const defaultState: IClassroomState = {
    loading: true,
};

// Selectors are responsible for getting values in the state
export const classroomSelectors = {
    getClassroomName: (state: { classroom: IClassroomState }) =>
        state.classroom.classroom ? state.classroom.classroom.name : undefined,
    getStudentList: (state: { classroom: IClassroomState }) =>
        state.classroom.classroom
            ? state.classroom.classroom.studentIds
            : undefined,
    isLoading: (state: { classroom: IClassroomState }) =>
        state.classroom.loading,
};

// And actions allow us to mutate the state
export const classroomActions = {
    fetchClassroom: createAction('classroom_FETCH'),
    notifyStudent: createAction(
        'classroom_NOTIFY',
        resolve => (studentId: string) => resolve({ studentId })
    ),
    setClassroom: createAction(
        'classroom_SET_CLASSROOM',
        resolve => (classroom: IClassroom) => resolve({ classroom })
    ),
    setLoading: createAction(
        'classroom_SET_LOADING',
        resolve => (loading: boolean) => resolve({ loading })
    ),
};

export type ClassroomAction = ActionType<typeof classroomActions>;

// The reducer is responsible for changing the state based on actions received
export const classroomReducer = produce(
    (draft: IClassroomState, action: ClassroomAction) => {
        // We switch based on the type of action
        switch (action.type) {
            case getType(classroomActions.setClassroom): {
                const { classroom } = action.payload;

                draft.classroom = classroom;

                return draft;
            }
            case getType(classroomActions.setLoading): {
                const { loading } = action.payload;

                draft.loading = loading;

                return draft;
            }
            default: {
                // Redux requires us to return the state in case the action does not match
                return draft;
            }
        }
    },
    defaultState
);
