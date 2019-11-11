import {
    faUsers,
    faCalculator,
    faChartLine,
    faCog,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

export const TeacherHome = () => {
    const dispatch = useDispatch();

    const name = useSelector(selectors.user.getUserFirstName) || '';

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {name}!</StyledHeader>
                <StyledCard style={styles.card} />
                <StyledCardButton
                    icon={faCalculator}
                    text="Set Daily Problems"
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
                />
                <StyledCardButton
                    icon={faCog}
                    text="Settings"
                    styleAttr="error"
                />
            </View>
        </Background>
    );
};

TeacherHome.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
    },
    card: {
        flex: 1,
        marginBottom: 16,
    },
});
