/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledHeader } from '@client/components/Header';
import { colors } from '@client/constants/colors';

import bg2 from '../../../assets/bg2.png';

interface IUserSelectionScreenProps {
    navigation: any;
}

export const UserSelectionScreen = (props: IUserSelectionScreenProps) => {
    const navigateTo = (screen: string) => () => {
        props.navigation.navigate(screen);
    };

    return (
        <Background backgroundImage={bg2} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <StyledHeader>Who are you?</StyledHeader>
                </View>
                <View style={styles.container}>
                    <StyledButton
                        text="a student"
                        onPress={navigateTo('StudentSignUp')}
                    />
                </View>
                <View style={styles.container}>
                    <StyledButton
                        text="a teacher"
                        onPress={navigateTo('TeacherSignUp')}
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
