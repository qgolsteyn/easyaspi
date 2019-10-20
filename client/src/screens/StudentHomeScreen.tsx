/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';
import { colors } from '../constants/colors';
import { StyledHeader } from '../components/Header';
import { StyledCard } from '../components/Card';
import { Icon } from '../components/Icon';
import { StyledButton } from '../components/Button';
import { useSelector } from 'react-redux';
import { selectors } from '../store';

export const StudentHome = () => {
    const userName = useSelector(selectors.user.getName);

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {userName}!</StyledHeader>
                <StyledCard title="Today's math exercises">
                    <View style={styles.typeList}>
                        <Icon backgroundColor={colors.inputs} text="+" />
                        <Icon backgroundColor={colors.inputs} text="-" />
                        <Icon backgroundColor={colors.inputs} text="*" />
                        <Icon backgroundColor={colors.inputs} text="/" />
                    </View>
                    <StyledButton text="Start!" />
                </StyledCard>
                <StyledCard title="Get more practice" style={{ marginTop: 16 }}>
                    <View style={styles.exerciseList}>
                        <Icon backgroundColor={colors.inputs} text="+" />
                        <Icon backgroundColor={colors.inputs} text="-" />
                        <Icon backgroundColor={colors.inputs} text="*" />
                        <Icon backgroundColor={colors.inputs} text="/" />
                        <Icon backgroundColor={colors.inputs} text="+" />
                        <Icon backgroundColor={colors.inputs} text="-" />
                        <Icon backgroundColor={colors.inputs} text="*" />
                        <Icon backgroundColor={colors.inputs} text="/" />
                    </View>
                </StyledCard>
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
        paddingHorizontal: 16,
    },
    typeList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    exerciseList: {
        width: '100%',
        display: 'flex',
        marginTop: 8,
        marginBottom: 8,
    },
});
