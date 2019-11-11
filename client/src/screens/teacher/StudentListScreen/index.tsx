import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCard } from '@client/components/Card';

import { colors } from '@client/constants/colors';

import { selectors } from '@client/store';

import bg1 from '../../../../assets/bg1.png';

export const StudentList = () => {
    const students = useSelector(selectors.teacher.getStudents);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledCard title="Students" style={{ marginBottom: 16 }}>
                    {students.map(student => (
                        <Text key={student.id}>{student.name}</Text>
                    ))}
                </StyledCard>
            </View>
        </Background>
    );
};

StudentList.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
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
