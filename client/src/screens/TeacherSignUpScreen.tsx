/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';

import { colors } from '../constants/colors';
import { StyledInput } from '../components/Input';
import { StyledHeader } from '../components/Header';
import { StyledForm } from '../components/Form';
import { actions } from '../store';

interface ITeacherSignUpScreen {
    navigation: any;
}

export const TeacherSignUpScreen = (props: ITeacherSignUpScreen) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: undefined,
        email: undefined,
        classroomName: undefined,
        password: undefined,
        classroomPasscode: undefined,
    });

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledForm backgroundColor={colors.bg}>
                    <StyledHeader>Create classroom</StyledHeader>
                    <StyledInput
                        label="Name"
                        textContentType="name"
                        style={{ marginBottom: 32 }}
                        value={state.name}
                        onChangeText={val => setState({ ...state, name: val })}
                    />
                    <StyledInput
                        label="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        style={{ marginBottom: 32 }}
                        value={state.email}
                        onChangeText={val => setState({ ...state, email: val })}
                    />
                    <StyledInput
                        label="Classroom name"
                        textContentType="name"
                        style={{ marginBottom: 32 }}
                        value={state.classroomName}
                        onChangeText={val =>
                            setState({ ...state, classroomName: val })
                        }
                    />
                    <StyledInput
                        label="Account Password"
                        textContentType="newPassword"
                        style={{ marginBottom: 32 }}
                        secureTextEntry
                        value={state.password}
                        onChangeText={val =>
                            setState({ ...state, password: val })
                        }
                    />
                    <StyledInput
                        label="Student registration code"
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        value={state.classroomPasscode}
                        onChangeText={val =>
                            setState({ ...state, classroomPasscode: val })
                        }
                    />
                    <StyledButton
                        text="Submit!"
                        onPress={() =>
                            dispatch(
                                actions.user.registerTeacher(
                                    state.name,
                                    state.classroomName,
                                    state.classroomPasscode,
                                    state.email,
                                    state.password
                                )
                            )
                        }
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
