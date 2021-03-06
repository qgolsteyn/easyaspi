import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledCard } from '@client/components/Card';
import { ListItem } from '@client/components/ListItem';
import { colors } from '@client/constants/colors';
import { selectors } from '@client/store';

import bg1 from '../../../../assets/bg1.png';

const PERCENT = 100;
const TROPHY_SIZE = 32;

export const StudentStats = () => {
    const student = useSelector(selectors.teacher.getCurrentStudent);
    const stats = useSelector(selectors.teacher.getCurrentStudentStatistics);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Student statistics" />
                <StyledCard style={styles.achievements}>
                    <ScrollView>
                        {stats === undefined ? (
                            <Text style={styles.noStatsText}>
                                No statistics for this account
                            </Text>
                        ) : (
                            <>
                                <Text style={styles.title}>
                                    Grades for {student && student.name}
                                </Text>
                                <ListItem
                                    text=""
                                    extra={[
                                        {
                                            color: colors.success,
                                            text: '%',
                                        },
                                        {
                                            color: colors.primary,
                                            text: '#',
                                        },
                                    ]}
                                />
                                <ListItem
                                    text="today"
                                    extra={[
                                        {
                                            color: colors.success,
                                            text: stats.numDailyAttempts
                                                ? Math.round(
                                                      (stats.numDailyCorrectAnswers /
                                                          stats.numDailyAttempts) *
                                                          PERCENT,
                                                  )
                                                : '-',
                                        },
                                        {
                                            color: colors.primary,
                                            text: stats.numDailyAttempts,
                                        },
                                    ]}
                                />
                                <ListItem
                                    text="all time"
                                    extra={[
                                        {
                                            color: colors.success,
                                            text: stats.totalLifetimeAttempts
                                                ? Math.round(
                                                      (stats.totalLifetimeCorrectAnswers /
                                                          stats.totalLifetimeAttempts) *
                                                          PERCENT,
                                                  )
                                                : '-',
                                        },
                                        {
                                            color: colors.primary,
                                            text: stats.totalLifetimeAttempts,
                                        },
                                    ]}
                                />
                                <View style={styles.icon}>
                                    <FontAwesomeIcon
                                        icon={faChartLine}
                                        size={TROPHY_SIZE}
                                        color={colors.success}
                                    />
                                </View>
                                <ListItem
                                    text=""
                                    extra={[
                                        {
                                            color: colors.success,
                                            text: '%',
                                        },
                                        {
                                            color: colors.primary,
                                            text: '#',
                                        },
                                    ]}
                                />
                                {Object.keys(stats.totals).map(key => (
                                    <ListItem
                                        key={key}
                                        text={key}
                                        extra={[
                                            {
                                                color: colors.success,
                                                text: stats.totals[key]
                                                    .totalAttempts
                                                    ? Math.round(
                                                          (stats.totals[key]
                                                              .totalCorrectAnswers /
                                                              stats.totals[key]
                                                                  .totalAttempts) *
                                                              PERCENT,
                                                      )
                                                    : '-',
                                            },
                                            {
                                                color: colors.primary,
                                                text:
                                                    stats.totals[key]
                                                        .totalAttempts,
                                            },
                                        ]}
                                    />
                                ))}
                            </>
                        )}
                    </ScrollView>
                </StyledCard>
            </View>
        </Background>
    );
};

StudentStats.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    achievements: {
        flex: 1,
    },
    icon: {
        alignItems: 'center',
        display: 'flex',
        height: 64,
        justifyContent: 'center',
        marginBottom: 16,
        width: '100%',
    },
    noStatsText: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 32,
    },
    title: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        width: '100%',
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
