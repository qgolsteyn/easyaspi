/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

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
        <Background backgroundImage={bg1} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <View style={styles.scrollView}>
                        <StyledHeader>Let's meet</StyledHeader>
                        <StyledInput
                            label="My name is..."
                            styles={{ marginBottom: 32 }}
                        />
                        <StyledInput label="What is the teacher password?" />
                    </View>
                </KeyboardAvoidingView>
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
        paddingBottom: 32,
    },
    scrollView: {
        paddingBottom: 32,
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        paddingHorizontal: 32,
    },
});
