import {
    faCalendarDay,
    faChartLine,
    faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledCard } from '@client/components/Card';
import { ListItem } from '@client/components/ListItem';
import { colors } from '@client/constants/colors';
import { selectors } from '@client/store';

import { AchievementCard } from './AchievementCard';

import bg1 from '../../../../assets/bg1.png';

const TROPHY_SIZE = 32;

export const StudentAchievements = () => {
    const stats = useSelector(selectors.student.getStats);
    const achievements = useSelector(selectors.student.getAchievements);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Stats and Achievements" />
                <StyledCard style={styles.achievements}>
                    <ScrollView>
                        <View style={styles.icon}>
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                size={TROPHY_SIZE}
                                color={colors.primary}
                            />
                        </View>
                        <ListItem
                            text="today's results"
                            extra={[
                                {
                                    color: colors.success,
                                    text: stats.numDailyCorrectAnswers,
                                },
                                {
                                    color: colors.error,
                                    text:
                                        stats.numDailyAttempts -
                                        stats.numDailyCorrectAnswers,
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
                        {Object.keys(stats.totals).map(key => (
                            <ListItem
                                key={key}
                                text={key}
                                extra={[
                                    {
                                        color: colors.success,
                                        text:
                                            stats.totals[key]
                                                .totalCorrectAnswers,
                                    },
                                    {
                                        color: colors.error,
                                        text:
                                            stats.totals[key].totalAttempts -
                                            stats.totals[key]
                                                .totalCorrectAnswers,
                                    },
                                ]}
                            />
                        ))}
                        <View style={styles.icon}>
                            <FontAwesomeIcon
                                icon={faTrophy}
                                size={TROPHY_SIZE}
                                color={colors.secondary}
                            />
                        </View>
                        {achievements.map((achievement, index) => (
                            <AchievementCard
                                key={achievement.name + index}
                                img={{
                                    uri: achievement.imgUrl,
                                }}
                                heading={achievement.name}
                                body={achievement.description}
                            />
                        ))}
                    </ScrollView>
                </StyledCard>
            </View>
        </Background>
    );
};

StudentAchievements.navigationOptions = () => ({
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
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 16,
        width: '100%',
    },
});
