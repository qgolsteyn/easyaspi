import {
    faCalculator,
    faChartLine,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useCavy } from 'cavy';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';
import { ProblemSetCard } from './ProblemSetCard';

export const TeacherHome = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectors.teacher.isLoading);
    const name = useSelector(selectors.user.getUserFirstName) || '';

    const testHook = useCavy();

    return (
        <Background backgroundColor={colors.bg}>
            {loading ? (
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            ) : (
                <View style={styles.wrapper}>
                    <StyledHeader ref={testHook('TeacherHomeScreen.Header')}>
                        Hi {name}!
                    </StyledHeader>
                    <ProblemSetCard />
                    <StyledCardButton
                        icon={faChartLine}
                        text="View Classroom Progress"
                        styleAttr="success"
                        styles={{ marginBottom: 8 }}
                        onPress={() =>
                            dispatch(
                                actions.nav.goToScreen('ClassroomStatistics'),
                            )
                        }
                    />
                    <StyledCardButton
                        icon={faUsers}
                        text="Student List"
                        styleAttr="secondary"
                        styles={{ marginBottom: 8 }}
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('StudentsList'))
                        }
                    />
                    <StyledCardButton
                        icon={faCalculator}
                        text="Classroom Settings"
                        styles={{ marginBottom: 8 }}
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('DailyProblemSet'))
                        }
                    />
                </View>
            )}
        </Background>
    );
};

TeacherHome.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginBottom: 16,
    },
    loadingView: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
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
