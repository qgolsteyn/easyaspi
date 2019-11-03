import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { UserType } from '@shared/index';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledForm } from '@client/components/Form';
import { StyledHeader } from '@client/components/Header';
import { StyledInput } from '@client/components/Input';

import { colors } from '@client/constants/colors';
import {
    classroomName,
    classroomPasscode,
    name,
} from '@client/constants/validations';

import { actions, selectors } from '@client/store';
import { AuthStage } from '@client/store/reducers/user';

validate.validators.presence.options = { message: "can't be empty." };
const constraints = {
    classroomName,
    classroomPasscode,
    name,
};

export const TeacherSignUpScreen = () => {
    const dispatch = useDispatch();

    const authStage = useSelector(selectors.user.getAuthStage);
    const currentUser = useSelector(selectors.user.getCurrentUser);

    const [state, setState] = useState({
        errors: {
            classroomName: undefined,
            classroomPasscode: undefined,
            name: undefined,
        },
        values: {
            classroomName: undefined,
            classroomPasscode: undefined,
            name: currentUser ? currentUser.name : undefined,
        },
    });

    const onValue = (key: 'name' | 'classroomName' | 'classroomPasscode') => (
        val: string,
    ) => {
        setState({
            ...state,
            errors: { ...state.errors, [key]: undefined },
            values: { ...state.values, [key]: val },
        });
    };

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.user.register(
                    state.values.name || '',
                    UserType.TEACHER,
                    state.values.classroomName || '',
                    state.values.classroomPasscode || '',
                ),
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
                        onChangeText={onValue('name')}
                    />
                    <StyledInput
                        label="Classroom"
                        placeholder="Classroom name"
                        textContentType="name"
                        style={{ marginBottom: 16 }}
                        value={state.values.classroomName}
                        error={state.errors.classroomName}
                        onChangeText={onValue('classroomName')}
                    />
                    <StyledInput
                        placeholder="Student registration code"
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        value={state.values.classroomPasscode}
                        error={state.errors.classroomPasscode}
                        onChangeText={onValue('classroomPasscode')}
                    />
                    <StyledButton
                        text="Submit!"
                        onPress={onSubmit}
                        loading={authStage === AuthStage.AUTH_CHECK_LOADING}
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
        display: 'flex',
        height: '100%',
        width: '100%',
    },
});
