/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { colors } from '../constants/colors';

import welcome from '../../assets/welcome.png';
import logo from '../../assets/logo.png';
import { NavigationActions } from 'react-navigation';
import { actions } from '../store';

export const WelcomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <Background>
            <View style={styles.wrapper}>
                <View style={styles.logoContainer}>
                    <View style={styles.topBuffer} />
                    <Image
                        source={welcome}
                        style={{
                            width: '100%',
                            height: 400,
                            resizeMode: 'contain',
                        }}
                    />
                    <Image
                        source={logo}
                        style={{
                            width: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <StyledButton
                        text="Let's start!"
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('UserSelection'))
                        }
                    />
                </View>
            </View>
        </Background>
    );
};

WelcomeScreen.navigationOptions = () => ({
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
    logoContainer: {
        display: 'flex',
        width: '100%',
    },
    topBuffer: {
        width: '100%',
        height: 32,
        marginBottom: -1,
        backgroundColor: colors.bg,
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        paddingHorizontal: 32,
    },
});
