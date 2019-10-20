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
    username: {
        presence: true,
        format: {
            pattern: /[a-zA-Z0-9]+/,
            message: 'must be a valid username.',
        },
        length: {
            minimum: 6,
            message: 'must have at least 6 characters.',
        },
    },
    classroomPasscode: {
        presence: true,
        format: {
            pattern: /[0-9]+/,
            message: 'must be all digits',
        },
    },
};

interface IStudentSignUpScreen {
    navigation: any;
}

export const StudentSignUpScreen = (props: IStudentSignUpScreen) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.user.isLoading);
    const [state, setState] = useState({
        values: {
            name: undefined,
            username: undefined,
            classroomPasscode: undefined,
        },
        errors: {
            name: undefined,
            username: undefined,
            classroomPasscode: undefined,
        },
    });

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.loginStudent(
                    state.values.name,
                    state.values.username,
                    state.values.classroomPasscode
                )
            );
        }
    };

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledForm backgroundColor={colors.bg}>
                    <StyledHeader>Let's meet!</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        textContentType="name"
                        autoCapitalize="words"
                        error={state.errors.name}
                        style={{ marginBottom: 16 }}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, name: val },
                                errors: { ...state.errors, name: undefined },
                            })
                        }
                    />
                    <StyledInput
                        label="My username is..."
                        textContentType="username"
                        autoCapitalize="none"
                        error={state.errors.username}
                        style={{ marginBottom: 16 }}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, username: val },
                                errors: {
                                    ...state.errors,
                                    username: undefined,
                                },
                            })
                        }
                    />
                    <StyledInput
                        label="What is the teacher password?"
                        error={state.errors.classroomPasscode}
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
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

StudentSignUpScreen.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
});
