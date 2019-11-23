import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledCard } from '@client/components/Card';
import { colors } from '@client/constants/colors';

import bg1 from '../../../../assets/bg1.png';

export const DailyProblemSet = () => {
    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Daily Problem Set" />
                <StyledCard style={styles.studentList}></StyledCard>
            </View>
        </Background>
    );
};

DailyProblemSet.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    studentList: {
        flex: 1,
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 16,
        width: '100%',
    },
});
