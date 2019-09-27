/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { colors } from '../constants/colors';

import bg2 from '../../assets/bg2.png';

export const UserSelectionScreen = () => {
    return (
        <Background backgroundImage={bg2}>
            <View style={styles.wrapper}></View>
        </Background>
    );
};

UserSelectionScreen['navigationOptions'] = () => ({
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
});
