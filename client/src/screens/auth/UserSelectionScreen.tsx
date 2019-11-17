import { useCavy } from 'cavy';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledHeader } from '@client/components/Header';
import { colors } from '@client/constants/colors';
import { actions } from '@client/store';

import bg2 from '../../../assets/bg2.png';

export const UserSelectionScreen = () => {
    const dispatch = useDispatch();

    const testHook = useCavy();

    return (
        <Background backgroundImage={bg2} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <StyledHeader>Who are you?</StyledHeader>
                </View>
                <View style={styles.container}>
                    <StyledButton
                        text="a student"
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('StudentSignUp'))
                        }
                        ref={testHook('UserSelection.Student')}
                    />
                </View>
                <View style={styles.container}>
                    <StyledButton
                        text="a teacher"
                        onPress={() =>
                            dispatch(actions.nav.goToScreen('TeacherSignUp'))
                        }
                        ref={testHook('UserSelection.Teacher')}
                    />
                </View>
            </View>
        </Background>
    );
};

UserSelectionScreen.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        width: '100%',
    },
    header: {
        alignItems: 'center',
        display: 'flex',
        height: '30%',
        justifyContent: 'center',
        paddingHorizontal: 32,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        width: '100%',
    },
});
