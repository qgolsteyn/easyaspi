/**
 * Demo reducer and actions for reference purposes
 */

import { createAction, ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import { IClassroom } from 'shared';

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
    getStudentList: (state: { classroom: IClassroomState }) =>
        state.classroom.classroom
            ? state.classroom.classroom.studentIds
            : undefined,
    getClassroomName: (state: { classroom: IClassroomState }) =>
        state.classroom.classroom ? state.classroom.classroom.name : undefined,
    isLoading: (state: { classroom: IClassroomState }) =>
        state.classroom.loading,
};

// And actions allow us to mutate the state
export const classroomActions = {
    fetchClassroom: createAction('classroom_FETCH'),
    setClassroom: createAction(
        'classroom_SET_CLASSROOM',
        resolve => (classroom: IClassroom) => resolve({ classroom })
    ),
    setLoading: createAction(
        'classroom_SET_LOADING',
        resolve => (loading: boolean) => resolve({ loading })
    ),
    notifyStudent: createAction(
        'classroom_NOTIFY',
        resolve => (studentId: string) => resolve({ studentId })
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
