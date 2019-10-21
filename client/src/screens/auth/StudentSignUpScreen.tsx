/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { UserType } from 'shared';

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
            message: 'must be all digits',
        },
    },
};

export const StudentSignUpScreen = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectors.user.getCurrentUser);
    const loading = useSelector(selectors.user.isLoading);

    const [state, setState] = useState(() => ({
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
    }));

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.register(
                    state.values.name,
                    UserType.STUDENT,
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
                    <StyledHeader>Let's meet!</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        textContentType="name"
                        autoCapitalize="words"
                        value={state.values.name}
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
                        label="The class name is..."
                        textContentType="name"
                        autoCapitalize="words"
                        value={state.values.classroomName}
                        error={state.errors.classroomName}
                        style={{ marginBottom: 16 }}
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
                        label="What is the teacher password?"
                        value={state.values.classroomPasscode}
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
