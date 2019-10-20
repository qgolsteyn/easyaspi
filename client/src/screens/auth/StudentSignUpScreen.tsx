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

interface IStudentSignUpScreen {
    navigation: any;
}

export const StudentSignUpScreen = (props: IStudentSignUpScreen) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        values: {
            name: undefined,
            username: undefined,
            classroomPasscode: undefined,
        },
        error: {
            message: undefined,
            name: false,
            username: false,
            classroomPasscode: false,
        },
    });

    const onSubmit = () => {
        // Are fields empty?
    };

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledForm backgroundColor={colors.bg}>
                    <StyledHeader>Let's meet!</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        textContentType="name"
                        error
                        style={{ marginBottom: 16 }}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, name: val },
                            })
                        }
                    />
                    <StyledInput
                        label="My username is..."
                        textContentType="username"
                        style={{ marginBottom: 16 }}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, name: val },
                            })
                        }
                    />
                    <StyledInput
                        label="What is the teacher password?"
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        onChangeText={val =>
                            setState({
                                ...state,
                                values: { ...state.values, name: val },
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
