import {
    faCalculator,
    faChartLine,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useCavy } from 'cavy';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';
import { ProblemSetCard } from './ProblemSetCard';

export const TeacherHome = () => {
    const dispatch = useDispatch();

    const name = useSelector(selectors.user.getUserFirstName) || '';

    const testHook = useCavy();

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledHeader ref={testHook('TeacherHomeScreen.Header')}>
                    Hi {name}!
                </StyledHeader>
                <ProblemSetCard />
                <StyledCardButton
                    icon={faCalculator}
                    text="Daily Problems Settings"
                    styles={{ marginBottom: 8 }}
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
                    icon={faChartLine}
                    text="View Classroom Progress"
                    styleAttr="success"
                    styles={{ marginBottom: 8 }}
                    onPress={() =>
                        dispatch(actions.nav.goToScreen('ClassroomStatistics'))
                    }
                />
            </View>
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
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
    },
});
