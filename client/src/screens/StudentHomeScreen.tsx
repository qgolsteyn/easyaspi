/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { colors } from '../constants/colors';
import { actions, selectors } from '../store';

import welcome from '../../assets/welcome.png';
import logo from '../../assets/logo.png';

export const StudentHome = () => {
    const loading = useSelector(selectors.user.isLoading);
    const dispatch = useDispatch();

    return (
        <Background>
            <View style={styles.wrapper}>
                <Text>Student</Text>
            </View>
        </Background>
    );
};

StudentHome.navigationOptions = () => ({
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
