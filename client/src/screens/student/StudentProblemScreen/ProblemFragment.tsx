import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { actions } from '@client/store';
import { IProblem } from '@client/store/reducers/problems';

interface IProblemFragmentProps {
    currentProblemNumber: number;
    currentProblem: IProblem;
}

export const ProblemFragment = (props: IProblemFragmentProps) => {
    const dispatch = useDispatch();

    return (
        <>
            <StyledCard
                title={`Question ${props.currentProblemNumber}`}
                style={styles.problemCard}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.problemText}>
                        {props.currentProblem.problem}
                    </Text>
                </View>
            </StyledCard>
            <View style={styles.buttonRow}>
                <StyledButton
                    text="I got it!"
                    styleAttr="success"
                    onPress={() =>
                        dispatch(actions.problems.solveCurrentProblem(true))
                    }
                    styles={{
                        ...styles.button,
                        marginRight: 8,
                    }}
                />
                <StyledButton
                    styleAttr="error"
                    text="I need help"
                    onPress={() =>
                        dispatch(actions.problems.solveCurrentProblem(false))
                    }
                    styles={{
                        ...styles.button,
                        marginLeft: 8,
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
    },
    cardContent: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 64,
        width: '100%',
    },
    problemCard: {
        flex: 1,
        marginBottom: 16,
        width: '100%',
    },
    problemPrompt: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 32,
        marginBottom: 32,
    },
    problemText: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 64,
    },
});
