import React from 'react';
import { ProgressBarAndroid, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { colors } from '@client/constants/colors';
import { selectors } from '@client/store';

import { DoneFragment } from './DoneFragment';
import { LoadingFragment } from './LoadingFragment';
import { ProblemFragment } from './ProblemFragment';

import bg1 from '../../../../assets/bg1.png';
import { SolutionFragment } from './SolutionFragment';
import { StyledBackHeader } from '@client/components/BackHeader';

const UNSOLVED_PROBLEM_SCORE_REDUCTION = 0.5;

export const StudentProblem = () => {
    const currentProblem = useSelector(selectors.problems.getCurrentProblem);
    const currentProblemNumber = useSelector(
        selectors.problems.getCurrentProblemNumber,
    );
    const numberOfProblems = useSelector(
        selectors.problems.getNumberOfProblems,
    );
    const isDone = currentProblemNumber > numberOfProblems;

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                {isDone ? (
                    <DoneFragment />
                ) : currentProblem === null ? (
                    <LoadingFragment />
                ) : (
                    <>
                        <StyledBackHeader
                            title={`Problem ${currentProblemNumber}`}
                        />
                        {currentProblem.solved ? (
                            <SolutionFragment currentProblem={currentProblem} />
                        ) : (
                            <ProblemFragment currentProblem={currentProblem} />
                        )}
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
