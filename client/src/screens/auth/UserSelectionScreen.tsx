/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Background } from '../../components/Background';
import { StyledButton } from '../../components/Button';
import { StyledHeader } from '../../components/Header';

import bg2 from '../../../assets/bg2.png';
import { colors } from '../../constants/colors';

interface IUserSelectionScreenProps {
    navigation: any;
}

export const UserSelectionScreen = (props: IUserSelectionScreenProps) => {
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
                            props.navigation.navigate('StudentSignUp')
                        }
                    />
                </View>
                <View style={styles.container}>
                    <StyledButton
                        text="a teacher"
                        onPress={() =>
                            props.navigation.navigate('TeacherSignUp')
                        }
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
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    container: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
});
