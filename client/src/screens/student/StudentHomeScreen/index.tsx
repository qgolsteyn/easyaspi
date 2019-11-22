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
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';
import { ProblemSetCard } from './ProblemSetCard';

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
                <ProblemSetCard />
                <StyledCardButton
                    text="Achievements"
                    icon={faTrophy}
                    styleAttr="secondary"
                    styles={{ marginBottom: 8 }}
                    onPress={() =>
                        dispatch(actions.nav.goToScreen('Achievements'))
                    }
                />
                <StyledCardButton
                    text="Get more help"
                    icon={faInfo}
                    styleAttr="success"
                    onPress={() => dispatch(actions.nav.goToScreen('Error'))}
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
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
    },
});
