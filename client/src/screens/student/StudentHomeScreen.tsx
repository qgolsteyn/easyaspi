import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';
import { Icon } from '@client/components/Icon';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

import bg1 from '../../../assets/bg1.png';
import { StyledIconButton } from '@client/components/ButtonCard';
import {
    faPaperPlane,
    faTrophy,
    faInfo,
} from '@fortawesome/free-solid-svg-icons';

export const StudentHome = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectors.user.getCurrentUser);
    const userName = (currentUser ? currentUser.name : '') || '';

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {userName}!</StyledHeader>
                <StyledCard
                    title="Today's math exercises"
                    style={{ marginBottom: 16 }}
                >
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
                <StyledIconButton
                    text="Classroom chat"
                    icon={faPaperPlane}
                    styles={{ marginBottom: 8 }}
                />
                <StyledIconButton
                    text="Achievements"
                    icon={faTrophy}
                    styleAttr="secondary"
                    styles={{ marginBottom: 8 }}
                />
                <StyledIconButton
                    text="Get more help"
                    icon={faInfo}
                    styleAttr="success"
                />
            </View>
        </Background>
    );
};

StudentHome.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    exerciseList: {
        display: 'flex',
        marginBottom: 8,
        marginTop: 8,
        width: '100%',
    },
    typeList: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        width: '100%',
    },
});
