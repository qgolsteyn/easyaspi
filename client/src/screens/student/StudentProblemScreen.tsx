/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

import bg1 from '../../../assets/bg1.png';
import done from '../../../assets/done.png';

export const StudentProblem = () => {
    const dispatch = useDispatch();

    const currentProblem = useSelector(selectors.problems.getCurrentProblem);
    const currentProblemNumber = useSelector(
        selectors.problems.getCurrentProblemNumber
    );
    const numberOfProblems = useSelector(
        selectors.problems.getNumberOfProblems
    );

    const isDone = currentProblemNumber >= numberOfProblems;

    const [showSolution, setShowSolution] = useState(true);

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                {isDone ? (
                    <View style={styles.loadingView}>
                        <StyledHeader>Done for the day!</StyledHeader>
                        <Image
                            source={done}
                            style={{
                                height: 400,
                                resizeMode: 'contain',
                                width: '100%',
                            }}
                        />
                        <StyledButton
                            text="Back"
                            onPress={() =>
                                dispatch(actions.nav.goToScreen('StudentHome'))
                            }
                        />
                    </View>
                ) : currentProblem === null ? (
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                ) : (
                    <>
                        <ProgressBarAndroid
                            style={styles.progressBar}
                            styleAttr="Horizontal"
                            color="#FFF"
                            indeterminate={false}
                            progress={
                                (currentProblemNumber -
                                    (currentProblem.solved ? 0 : 0.5)) /
                                numberOfProblems
                            }
                        />
                        <StyledCard
                            title={`Question ${currentProblemNumber}`}
                            style={styles.problemCard}
                            height="100%"
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.problemPrompt}>
                                    {currentProblem.solved && showSolution
                                        ? 'The solution is'
                                        : currentProblem.prompt}
                                </Text>
                                <Text style={styles.problemText}>
                                    {currentProblem.solved && showSolution
                                        ? currentProblem.solution
                                        : currentProblem.problem}
                                </Text>
                            </View>
                        </StyledCard>
                        <View style={styles.buttonRow}>
                            {!currentProblem.solved ? (
                                <>
                                    <StyledButton
                                        text="I got it!"
                                        styleAttr="success"
                                        onPress={() =>
                                            dispatch(
                                                actions.problems.solveCurrentProblem(
                                                    true
                                                )
                                            )
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
                                            dispatch(
                                                actions.problems.solveCurrentProblem(
                                                    false
                                                )
                                            )
                                        }
                                        styles={{
                                            ...styles.button,
                                            marginLeft: 8,
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <StyledButton
                                        text={
                                            showSolution
                                                ? 'See problem'
                                                : 'See solution'
                                        }
                                        onPress={() =>
                                            setShowSolution(!showSolution)
                                        }
                                        styles={{
                                            ...styles.button,
                                            flex: 2,
                                            marginRight: 8,
                                        }}
                                    />
                                    <StyledButton
                                        text="Next >"
                                        onPress={() => {
                                            setShowSolution(true);
                                            dispatch(
                                                actions.problems.goToNextProblem()
                                            );
                                        }}
                                        styles={{
                                            ...styles.button,
                                            marginLeft: 8,
                                        }}
                                    />
                                </>
                            )}
                        </View>
                    </>
                )}
            </View>
        </Background>
    );
};

StudentProblem.navigationOptions = () => ({
    header: null,
});

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
    loadingView: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
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
    progressBar: {
        flex: 0,
        marginBottom: 16,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        width: '100%',
    },
});
