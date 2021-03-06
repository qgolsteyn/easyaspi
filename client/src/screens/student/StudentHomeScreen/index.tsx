import { faInfo, faTimes, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useCavy } from 'cavy';
import { Linking } from 'expo';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCardButton } from '@client/components/ButtonCard';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { actions, selectors } from '@client/store';
import { ProblemSetCard } from './ProblemSetCard';

export const StudentHome = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectors.student.isLoading);
    const name = useSelector(selectors.user.getUserFirstName) || '';
    const helpURL = useSelector(selectors.student.getHelpURL);

    const testHook = useCavy();

    return (
        <Background backgroundColor={colors.bg}>
            {loading ? (
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            ) : (
                <View style={styles.wrapper}>
                    <StyledHeader ref={testHook('StudentHomeScreen.Header')}>
                        Hi {name}!
                    </StyledHeader>
                    <ProblemSetCard />
                    <StyledCardButton
                        text="Your statistics"
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
                        styles={{ marginBottom: 8 }}
                        styleAttr="success"
                        onPress={
                            helpURL
                                ? () => Linking.openURL(helpURL)
                                : () => ({})
                        }
                    />
                    <StyledCardButton
                        text="Logout"
                        icon={faTimes}
                        styleAttr="error"
                        onPress={() => dispatch(actions.student.reset())}
                    />
                </View>
            )}
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
