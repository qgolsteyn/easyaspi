import {
    faInfo,
    faPaperPlane,
    faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { useCavy } from 'cavy';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';
import { Icon } from '@client/components/Icon';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';

export const StudentHome = () => {
    const dispatch = useDispatch();

    const name = useSelector(selectors.user.getUserFirstName) || '';

    const testHook = useCavy();

    return (
        <Background backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledHeader ref={testHook('StudentHomeScreen.Header')}>
                    Hi {name}!
                </StyledHeader>
                <StyledCard
                    title="Today's math exercises"
                    style={{ flex: 1, marginBottom: 16 }}
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
                <StyledCardButton
                    text="Classroom chat"
                    icon={faPaperPlane}
                    styles={{ marginBottom: 8 }}
                />
                <StyledCardButton
                    text="Achievements"
                    icon={faTrophy}
                    styleAttr="secondary"
                    styles={{ marginBottom: 8 }}
                />
                <StyledCardButton
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
    },
});
