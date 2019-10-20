/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { colors } from '../constants/colors';
import { StyledInput } from '../components/Input';
import { StyledHeader } from '../components/Header';
import { StyledForm } from '../components/Form';
import { useDispatch } from 'react-redux';
import { actions } from '../store';

interface IStudentSignUpScreen {
    navigation: any;
}

export const StudentSignUpScreen = (props: IStudentSignUpScreen) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: undefined,
        classroomPasscode: undefined,
    });

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledForm backgroundColor={colors.bg}>
                    <StyledHeader>Let's meet!</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        textContentType="name"
                        style={{ marginBottom: 32 }}
                        onChangeText={val => setState({ ...state, name: val })}
                    />
                    <StyledInput
                        label="What is the teacher password?"
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        onChangeText={val => setState({ ...state, name: val })}
                    />
                    <StyledButton
                        text="Submit!"
                        onPress={() =>
                            dispatch(
                                actions.user.registerStudent(
                                    state.name,
                                    state.name,
                                    state.classroomPasscode
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
