import {
    faDivide,
    faMinus,
    faPlus,
    faShapes,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useCavy } from 'cavy';
import * as React from 'react';
import { ProgressBarAndroid, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledIconButton } from '@client/components/ButtonIcon';
import { StyledCard } from '@client/components/Card';
import { colors } from '@client/constants/colors';
import { actions, selectors } from '@client/store';
import { ProblemSetState } from '@client/store/reducers/problems';
import { useInterval } from '@client/utils/useInterval';
import { ScrollView } from 'react-native-gesture-handler';

const hoursInADay = 23;
const minutesInAnHour = 60;
const INTERVAL = 1000;

export const ProblemSetCard = () => {
    const dispatch = useDispatch();
    const testHook = useCavy();
    const [now, setNow] = React.useState(new Date());

    const classroomInfo = useSelector(selectors.student.getActiveProblems);

    useInterval(() => setNow(new Date()), INTERVAL);

    const problemSetState = useSelector(selectors.problems.getProblemSetState);

    const timeElapsed =
        now.getHours() / hoursInADay +
        now.getMinutes() / (minutesInAnHour * hoursInADay);

    const hoursLeft = hoursInADay - now.getHours();
    const minutesLeft = String(minutesInAnHour - now.getMinutes()).padStart(
        2,
        '0',
    );

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
                <ScrollView>
                    {classroomInfo.problemsForToday.map(problemType => (
                        <View key={problemType} style={styles.type}>
                            <StyledIconButton
                                icon={
                                    problemType === 'addition'
                                        ? faPlus
                                        : problemType === 'subtraction'
                                        ? faMinus
                                        : problemType === 'multiplication'
                                        ? faTimes
                                        : problemType === 'division'
                                        ? faDivide
                                        : faShapes
                                }
                                styleAttr="secondary"
                            />
                            <Text style={styles.typeText}>{problemType}</Text>
                        </View>
                    ))}
                </ScrollView>
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
    type: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 56,
    },
    typeList: {
        display: 'flex',
        flex: 1,
        marginBottom: 16,
        width: '100%',
    },
    typeText: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 20,
        marginBottom: 14,
        marginLeft: 16,
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
