/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';

import { colors } from '@client/constants/colors';
import { actions, selectors } from '@client/store';

import logo from '../../../assets/logo.png';
import welcome from '../../../assets/welcome.png';

export const WelcomeScreen = () => {
    const loading = useSelector(selectors.user.isLoading);
    const dispatch = useDispatch();

    return (
        <Background>
            <View style={styles.wrapper}>
                <View style={styles.logoContainer}>
                    <View style={styles.topBuffer} />
                    <Image
                        source={welcome}
                        style={{
                            height: 400,
                            resizeMode: 'contain',
                            width: '100%',
                        }}
                    />
                    <Image
                        source={logo}
                        style={{
                            resizeMode: 'contain',
                            width: '100%',
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <StyledButton
                        text="Let's start!"
                        loading={loading}
                        onPress={() => dispatch(actions.user.login())}
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
    buttonContainer: {
        display: 'flex',
        marginTop: 'auto',
        paddingHorizontal: 32,
        width: '100%',
    },
    logoContainer: {
        display: 'flex',
        width: '100%',
    },
    topBuffer: {
        backgroundColor: colors.bg,
        height: 4,
        marginBottom: -1,
        marginTop: -1,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingBottom: 32,
        width: '100%',
    },
});
