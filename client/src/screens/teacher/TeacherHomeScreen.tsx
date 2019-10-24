/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

import bg1 from '../../assets/bg1.png';

export const TeacherHome = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectors.user.getCurrentUser);
    const userName = (currentUser ? currentUser.name : '') || '';

    const loading = useSelector(selectors.classroom.isLoading);
    const classroomName = useSelector(selectors.classroom.getClassroomName);
    const classroomStudents =
        useSelector(selectors.classroom.getStudentList) || [];

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
    studentItem: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        width: '100%',
    },
});
