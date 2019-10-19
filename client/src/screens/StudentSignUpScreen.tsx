/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';

import bg1 from '../../assets/bg1.png';
import { colors } from '../constants/colors';
import { StyledInput } from '../components/Input';
import { StyledHeader } from '../components/Header';

interface IStudentSignUpScreen {
    navigation: any;
}

export const StudentSignUpScreen = (props: IStudentSignUpScreen) => {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <Background backgroundImage={bg1} backgroundColor={colors.bg}>
                <View style={styles.wrapper}>
                    <StyledHeader>Let's meet</StyledHeader>
                    <StyledInput
                        label="My name is..."
                        styles={{ marginBottom: 32 }}
                    />
                    <StyledInput label="What is the teacher password?" />
                    <View style={styles.buttonContainer}>
                        <StyledButton
                            text="Submit!"
                            onPress={() =>
                                props.navigation.navigate('UserSelection')
                            }
                        />
                    </View>
                </View>
            </Background>
        </KeyboardAvoidingView>
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 28,
        paddingHorizontal: 32,
        paddingBottom: 32,
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
    },
});
