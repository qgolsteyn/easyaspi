/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { actions, selectors } from '@client/store';
import { Background } from '@client/components/Background';
import { colors } from '@client/constants/colors';
import { StyledHeader } from '@client/components/Header';
import { StyledCard } from '@client/components/Card';
import { Icon } from '@client/components/Icon';
import { StyledButton } from '@client/components/Button';

import bg1 from '../../assets/bg1.png';

export const StudentHome = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectors.user.getCurrentUser).name;

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {userName.split(' ')[0]}!</StyledHeader>
                <StyledCard title="Today's math exercises">
                    <View style={styles.typeList}>
                        <Icon backgroundColor={colors.inputs} text="+" />
                        <Icon backgroundColor={colors.inputs} text="-" />
                    </View>
                    <StyledButton
                        text="Start!"
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('Problem'))
                        }
                    />
                </StyledCard>
            </View>
        </Background>
    );
};

StudentHome.navigationOptions = () => ({
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
        paddingHorizontal: 16,
    },
    typeList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    exerciseList: {
        width: '100%',
        display: 'flex',
        marginTop: 8,
        marginBottom: 8,
    },
});
