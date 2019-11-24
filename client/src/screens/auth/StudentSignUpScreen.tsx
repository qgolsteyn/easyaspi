import { useCavy } from 'cavy';
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

export const StudentSignUpScreen = () => {
    const dispatch = useDispatch();

    const authStage = useSelector(selectors.user.getAuthStage);
    const currentUser = useSelector(selectors.user.getCurrentUser);

    const testHook = useCavy();

    const [state, setState] = useState(() => ({
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
    }));

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
                    UserType.STUDENT,
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
                    <StyledHeader>Let's meet!</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        textContentType="name"
                        autoCapitalize="words"
                        value={state.values.name}
                        error={state.errors.name}
                        style={{ marginBottom: 16 }}
                        onChangeText={onValue('name')}
                        ref={testHook('StudentRegister.Name')}
                        errorRef={testHook('StudentRegister.ErrorName')}
                    />
                    <StyledInput
                        label="The class name is..."
                        textContentType="name"
                        autoCapitalize="words"
                        value={state.values.classroomName}
                        error={state.errors.classroomName}
                        style={{ marginBottom: 16 }}
                        onChangeText={onValue('classroomName')}
                        ref={testHook('StudentRegister.ClassroomName')}
                        errorRef={testHook(
                            'StudentRegister.ErrorClassroomName',
                        )}
                    />
                    <StyledInput
                        label="What is the teacher password?"
                        value={state.values.classroomPasscode}
                        error={state.errors.classroomPasscode}
                        keyboardType="number-pad"
                        style={{ marginBottom: 32 }}
                        onChangeText={onValue('classroomPasscode')}
                        ref={testHook('StudentRegister.ClassroomPasscode')}
                        errorRef={testHook(
                            'StudentRegister.ErrorClassroomPasscode',
                        )}
                    />
                    <StyledButton
                        text="Submit!"
                        onPress={onSubmit}
                        loading={authStage === AuthStage.AUTH_CHECK_LOADING}
                        styles={{ marginBottom: 32 }}
                        ref={testHook('StudentRegister.Submit')}
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
        display: 'flex',
        height: '100%',
        width: '100%',
    },
});
