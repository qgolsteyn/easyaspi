import { useCavy } from 'cavy';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { Icon } from '@client/components/Icon';
import { colors } from '@client/constants/colors';
import { actions, selectors } from '@client/store';
import { ProblemSetState } from '@client/store/reducers/problems';

export const ProblemSetCard = () => {
    const dispatch = useDispatch();
    const testHook = useCavy();

    const problemSetState = useSelector(selectors.problems.getProblemSetState);

    return (
        <StyledCard
            title="Today's math exercises"
            style={{ flex: 1, marginBottom: 16 }}
        >
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
            <StyledButton
                loading={problemSetState === ProblemSetState.LOADING}
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
    type: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    typeList: {
        display: 'flex',
        flex: 1,
        marginVertical: 16,
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
