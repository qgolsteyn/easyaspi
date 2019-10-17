/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';

import bg1 from '../../assets/bg1.png';
import { colors } from '../constants/colors';

interface IStudentSignUpScreen {
    navigation: any;
}

export const StudentSignUpScreen = (props: IStudentSignUpScreen) => {
    useKeepAwake();
    return (
        <Background backgroundImage={bg1} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <View style={styles.buttonContainer}>
                    <StyledButton
                        text="Submit!"
                        onPress={() =>
                            props.navigation.navigate('Auth')
                        }
                    />
                </View>
            </View>
        </Background>
    );
};

StudentSignUpScreen['navigationOptions'] = () => ({
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
        paddingBottom: 32,
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        paddingHorizontal: 32,
    },
});
