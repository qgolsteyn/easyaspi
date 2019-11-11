import { faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledIconButton } from '@client/components/ButtonCard';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

import bg1 from '../../../assets/bg1.png';

export const TeacherHome = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectors.user.getCurrentUser);
    const userName = (currentUser ? currentUser.name : '') || '';

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledHeader>Hi {userName}!</StyledHeader>
                <StyledIconButton
                    icon={faPaperPlane}
                    text="Classroom chat"
                    styles={{ marginBottom: 8 }}
                />
                <StyledIconButton
                    icon={faUsers}
                    text="Students list"
                    styleAttr="secondary"
                    onPress={() =>
                        dispatch(actions.nav.goToScreen('StudentsList'))
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
