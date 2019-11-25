import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { ProgressBarAndroid, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { StyledIconButton } from '@client/components/ButtonIcon';
import { StyledCard } from '@client/components/Card';
import { Icon } from '@client/components/Icon';
import { colors } from '@client/constants/colors';
import { selectors } from '@client/store';
import { useInterval } from '@client/utils/useInterval';

const hoursInADay = 23;
const minutesInAnHour = 60;
const INTERVAL = 1000;

export const ProblemSetCard = () => {
    const numberCompleted = useSelector(
        selectors.teacher.getNumberOfStudentsDone,
    );
    const numberOfStudents = useSelector(selectors.teacher.getNumberOfStudents);

    const [now, setNow] = React.useState(new Date());

    useInterval(() => setNow(new Date()), INTERVAL);

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
                <View style={styles.type}>
                    <Icon backgroundColor={colors.inputs} text="+" />
                    <Text style={styles.typeText}>Addition</Text>
                </View>
                <View style={styles.type}>
                    <Icon backgroundColor={colors.inputs} text="-" />
                    <Text style={styles.typeText}>Substraction</Text>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <StyledIconButton icon={faBell} />
                <Text style={styles.completionText}>
                    {numberCompleted}/{numberOfStudents} students done
                </Text>
            </View>
        </StyledCard>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
    },
    completionText: {
        color: '#333',
        flex: 1,
        fontFamily: 'josefin-sans',
        fontSize: 20,
        marginBottom: 8,
        marginLeft: 16,
    },
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
        marginLeft: 8,
        marginTop: 4,
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
