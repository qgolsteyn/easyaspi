/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Background } from '../components/Background';
import { colors } from '../constants/colors';
import { StyledHeader } from '../components/Header';
import { StyledCard } from '../components/Card';
import { StyledButton } from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from '../store';

import bg1 from '../../assets/bg1.png';

export const TeacherHome = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectors.user.getCurrentUser).name;

    const loading = useSelector(selectors.classroom.isLoading);
    const classroomName = useSelector(selectors.classroom.getClassroomName);
    const classroomStudents = useSelector(selectors.classroom.getStudentList);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {userName.split(' ')[0]}!</StyledHeader>
                <StyledCard title={loading ? 'Loading...' : classroomName}>
                    {!loading
                        ? classroomStudents.map(student => (
                              <View key={student} style={styles.studentItem}>
                                  <StyledButton
                                      text={student}
                                      onPress={() =>
                                          dispatch(
                                              actions.classroom.notifyStudent(
                                                  student
                                              )
                                          )
                                      }
                                  />
                              </View>
                          ))
                        : undefined}
                </StyledCard>
            </View>
        </Background>
    );
};

TeacherHome.navigationOptions = () => ({
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
    studentItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
    },
});
