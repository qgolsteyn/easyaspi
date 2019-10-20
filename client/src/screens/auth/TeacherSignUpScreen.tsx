/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { Background } from '../../components/Background';
import { StyledButton } from '../../components/Button';

import { colors } from '../../constants/colors';
import { StyledInput } from '../../components/Input';
import { StyledHeader } from '../../components/Header';
import { StyledForm } from '../../components/Form';
import { actions, selectors } from '../../store';

validate.validators.presence.options = { message: "can't be empty." };
const constraints = {
    name: {
        presence: true,
        format: {
            pattern: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/,
            message: 'must be a valid name.',
        },
    },
    email: {
        presence: true,
        format: {
            pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
            message: 'must be a valid email.',
        },
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            message: 'must have at least 6 characters.',
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
    const loading = useSelector(selectors.user.isLoading);
    const [state, setState] = useState({
        values: {
            name: undefined,
            email: undefined,
            classroomName: undefined,
            password: undefined,
            classroomPasscode: undefined,
        },
        errors: {
            name: undefined,
            email: undefined,
            classroomName: undefined,
            password: undefined,
            classroomPasscode: undefined,
        },
    });

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.registerTeacher(
                    state.values.name,
                    state.values.classroomName,
                    state.values.classroomPasscode,
                    state.values.email,
                    state.values.password
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
                        placeholder="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ marginBottom: 16 }}
                        value={state.values.email}
                        error={state.errors.email}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, email: val },
                                errors: { ...state.errors, email: undefined },
                            })
                        }
                    />
                    <StyledInput
                        placeholder="Password"
                        textContentType="newPassword"
                        autoCapitalize="none"
                        style={{ marginBottom: 32 }}
                        secureTextEntry
                        value={state.values.password}
                        error={state.errors.password}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, password: val },
                                errors: {
                                    ...state.errors,
                                    password: undefined,
                                },
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
