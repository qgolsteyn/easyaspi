/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { Background } from '../components/Background';
import { colors } from '../constants/colors';
import { StyledCard } from '../components/Card';
import { StyledButton } from '../components/Button';
import { actions } from '../store';

export const StudentProblem = () => {
    const dispatch = useDispatch();
    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledCard
                    title="Question 1"
                    style={styles.problemCard}
                    height="100%"
                ></StyledCard>
                <View style={styles.buttonRow}>
                    <StyledButton
                        text="Start!"
                        styles={{ ...styles.button, marginRight: 16 }}
                    />
                    <StyledButton text="Start!" styles={styles.button} />
                </View>
            </View>
        </Background>
    );
};

StudentProblem.navigationOptions = () => ({
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
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    problemCard: {
        width: '100%',
        flex: 1,
        marginBottom: 16,
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    button: {
        flex: 1,
    },
});
