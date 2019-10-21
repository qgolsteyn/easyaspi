/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    ProgressBarAndroid,
    Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from '../store';

import { Background } from '../components/Background';
import { colors } from '../constants/colors';
import { StyledCard } from '../components/Card';
import { StyledButton } from '../components/Button';
import { StyledHeader } from '../components/Header';

import bg1 from '../../assets/bg1.png';
import done from '../../assets/done.png';

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
    const isLoading = useSelector(selectors.problems.isLoading);

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
                                width: '100%',
                                height: 400,
                                resizeMode: 'contain',
                            }}
                        />
                        <StyledButton
                            text="Back"
                            onPress={() =>
                                dispatch(actions.nav.goToScreen('StudentHome'))
                            }
                        />
                    </View>
                ) : isLoading ? (
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
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    progressBar: {
        width: '100%',
        flex: 0,
        marginBottom: 16,
    },
    loadingView: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    problemCard: {
        width: '100%',
        flex: 1,
        marginBottom: 16,
    },
    cardContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 64,
    },
    problemPrompt: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 32,
        color: '#333',
        marginBottom: 32,
    },
    problemText: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 64,
        color: '#333',
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    button: {
        flex: 1,
    },
});
