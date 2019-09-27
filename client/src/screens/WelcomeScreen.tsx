/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';

import welcome from '../../assets/welcome.png';
import logo from '../../assets/logo.png';

export const WelcomeScreen = () => {
    return (
        <Background>
            <View style={styles.wrapper}>
                <View style={styles.logoContainer}>
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
                    <StyledButton text="Next" />
                </View>
            </View>
        </Background>
    );
};

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
        flexDirection: 'column',
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        paddingHorizontal: 32,
    },
});
