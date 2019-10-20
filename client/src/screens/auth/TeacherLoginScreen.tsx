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
    email: {
        presence: true,
        format: {
            pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
            message: 'must be a valid email.',
        },
    },
    password: {
        presence: true,
    },
};

export const TeacherLoginScreen = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.user.isLoading);
    const [state, setState] = useState({
        values: {
            email: undefined,
            password: undefined,
        },
        errors: {
            email: undefined,
            password: undefined,
        },
    });

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.loginTeacher(
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
                    <StyledHeader>Login</StyledHeader>
                    <StyledInput
                        placeholder="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ marginBottom: 16 }}
                        error={state.errors.email}
                        value={state.values.email}
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
                        style={{ marginBottom: 32 }}
                        secureTextEntry
                        autoCapitalize="none"
                        error={state.errors.password}
                        value={state.values.password}
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
                    <StyledButton
                        text="Login"
                        onPress={onSubmit}
                        styles={{ marginBottom: 16 }}
                        loading={loading}
                    />
                    <StyledButton
                        text="Create a new classroom"
                        styles={{ marginBottom: 32 }}
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('TeacherSignUp'))
                        }
                    />
                </StyledForm>
            </View>
        </Background>
    );
};

TeacherLoginScreen.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
});
