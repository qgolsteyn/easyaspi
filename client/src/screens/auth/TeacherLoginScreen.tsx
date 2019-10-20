/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Background } from '../../components/Background';
import { StyledButton } from '../../components/Button';

import { colors } from '../../constants/colors';
import { StyledInput } from '../../components/Input';
import { StyledHeader } from '../../components/Header';
import { StyledForm } from '../../components/Form';
import { actions } from '../../store';

export const TeacherLoginScreen = () => {
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
                    <StyledHeader>Login</StyledHeader>
                    <StyledInput
                        placeholder="Email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ marginBottom: 16 }}
                        value={state.email}
                        onChangeText={val => setState({ ...state, email: val })}
                    />
                    <StyledInput
                        placeholder="Password"
                        textContentType="newPassword"
                        style={{ marginBottom: 32 }}
                        secureTextEntry
                        autoCapitalize="none"
                        value={state.password}
                        onChangeText={val =>
                            setState({ ...state, password: val })
                        }
                    />
                    <StyledButton
                        text="Login"
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
                        styles={{ marginBottom: 16 }}
                    />
                    <StyledButton
                        text="Create a new classroom"
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('TeacherSignUp'))
                        }
                        styles={{ marginBottom: 32 }}
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
