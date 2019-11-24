import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledCard } from '@client/components/Card';
import { colors } from '@client/constants/colors';
import { selectors } from '@client/store';

import { AchievementCard } from './AchievementCard';

import bg1 from '../../../../assets/bg1.png';

const TROPHY_SIZE = 32;

export const StudentAchievements = () => {
    const achievements = useSelector(selectors.student.getAchievements);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Achievements" />
                <StyledCard style={styles.achievements}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon
                            icon={faTrophy}
                            size={TROPHY_SIZE}
                            color={colors.secondary}
                        />
                    </View>
                    {achievements.map(achievement => (
                        <AchievementCard
                            key={achievement.name}
                            img={{
                                uri: achievement.imgUrl,
                            }}
                            heading={achievement.name}
                            body={achievement.description}
                        />
                    ))}
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
