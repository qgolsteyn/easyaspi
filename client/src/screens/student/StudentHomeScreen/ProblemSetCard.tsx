import { useCavy } from 'cavy';
import * as React from 'react';
import { ProgressBarAndroid, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { ListItem } from '@client/components/ListItem';
import { colors } from '@client/constants/colors';
import { actions, selectors } from '@client/store';
import { ProblemSetState } from '@client/store/reducers/problems';

const hoursInADay = 24;
const minutesInAnHour = 60;

export const ProblemSetCard = () => {
    const dispatch = useDispatch();
    const testHook = useCavy();

    const problemSetState = useSelector(selectors.problems.getProblemSetState);

    const now = new Date();
    const timeElapsed =
        now.getHours() / hoursInADay +
        now.getMinutes() / (minutesInAnHour * hoursInADay);

    const hoursLeft = hoursInADay - now.getHours();
    const minutesLeft = minutesInAnHour - now.getMinutes();

    return (
        <StyledCard
            title="Today's math exercises"
            style={{ flex: 1, marginBottom: 16 }}
        >
            <View style={styles.timeLeft}>
                <Text style={styles.timeLeftText}>Time until deadline:</Text>
                <Text style={styles.timeLeftText}>
                    {hoursLeft}:{minutesLeft} hours left
                </Text>
            </View>
            <ProgressBarAndroid
                style={styles.progress}
                styleAttr="Horizontal"
                indeterminate={false}
                color={colors.secondary}
                progress={timeElapsed}
            />
            <View style={styles.typeList}>
                <ListItem icon="+" text="Addition" extra={[]} />
            </View>
            <StyledButton
                text={
                    problemSetState === ProblemSetState.NOT_STARTED
                        ? 'Start!'
                        : problemSetState === ProblemSetState.IN_PROGRESS
                        ? 'Continue!'
                        : 'See Result!'
                }
                onPress={() => dispatch(actions.nav.goToScreen('Problem'))}
                ref={testHook('StudentHomeScreen.DailyProblem')}
            />
        </StyledCard>
    );
};

const styles = StyleSheet.create({
    exerciseList: {
        display: 'flex',
        marginBottom: 8,
        marginTop: 8,
        width: '100%',
    },
    progress: {
        marginBottom: 8,
    },
    timeLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        width: '100%',
    },
    timeLeftText: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 14,
    },
    typeList: {
        display: 'flex',
        flex: 1,
        marginBottom: 16,
        width: '100%',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
    },
});
