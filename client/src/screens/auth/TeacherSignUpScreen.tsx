/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { UserType } from '@shared';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { colors } from '@client/constants/colors';
import { StyledInput } from '@client/components/Input';
import { StyledHeader } from '@client/components/Header';
import { StyledForm } from '@client/components/Form';
import { actions, selectors } from '@client/store';

validate.validators.presence.options = { message: "can't be empty." };
const constraints = {
    name: {
        presence: true,
        format: {
            pattern: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
            message: 'must be a valid name.',
        },
    },
    classroomName: {
        presence: true,
        format: {
            pattern: /[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
            message: 'must not contain special characters.',
        },
    },
    classroomPasscode: {
        presence: true,
        format: {
            pattern: /[0-9]+/,
            message: 'must be all digits.',
        },
        length: {
            minimum: 4,
            message: 'must have at least 4 numbers.',
        },
    },
};

interface ITeacherSignUpScreen {
    navigation: any;
}

export const TeacherSignUpScreen = (props: ITeacherSignUpScreen) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectors.user.getCurrentUser);
    const loading = useSelector(selectors.user.isLoading);

    const [state, setState] = useState({
        values: {
            name: currentUser.name,
            classroomName: undefined,
            classroomPasscode: undefined,
        },
        errors: {
            name: undefined,
            classroomName: undefined,
            classroomPasscode: undefined,
        },
    });

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.register(
                    state.values.name,
                    UserType.TEACHER,
                    state.values.classroomName,
                    state.values.classroomPasscode
                )
            );
        }
    };

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledForm backgroundColor={colors.bg}>
                    <StyledHeader>Register</StyledHeader>
                    <StyledInput
                        label="Personal info"
                        textContentType="name"
                        placeholder="Name"
                        style={{ marginBottom: 16 }}
                        value={state.values.name}
                        error={state.errors.name}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, name: val },
                                errors: { ...state.errors, name: undefined },
                            })
                        }
                    />
                    <StyledInput
                        label="Classroom"
                        placeholder="Classroom name"
                        textContentType="name"
                        style={{ marginBottom: 16 }}
                        value={state.values.classroomName}
                        error={state.errors.classroomName}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, classroomName: val },
                                errors: {
                                    ...state.errors,
                                    classroomName: undefined,
                                },
                            })
                        }
                    />
                    <StyledInput
                        placeholder="Student registration code"
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        value={state.values.classroomPasscode}
                        error={state.errors.classroomPasscode}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: {
                                    ...state.values,
                                    classroomPasscode: val,
                                },
                                errors: {
                                    ...state.errors,
                                    classroomPasscode: undefined,
                                },
                            })
                        }
                    />
                    <StyledButton
                        text="Submit!"
                        onPress={onSubmit}
                        loading={loading}
                        styles={{ marginBottom: 32 }}
                    />
                </StyledForm>
            </View>
        </Background>
    );
};

TeacherSignUpScreen.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
});
