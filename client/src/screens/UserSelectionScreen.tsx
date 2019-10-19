/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { StyledHeader } from '../components/Header';

import bg2 from '../../assets/bg2.png';
import { colors } from '../constants/colors';

interface IUserSelectionScreenProps {
    navigation: any;
}

export const UserSelectionScreen = (props: IUserSelectionScreenProps) => {
    return (
        <Background backgroundImage={bg2} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <StyledHeader>Let's meet</StyledHeader>
                <View style={styles.container}>
                    <StyledButton
                        text="a student"
                        onPress={() =>
                            props.navigation.navigate('StudentSignUp')
                        }
                    />
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
        paddingTop: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 96,
        paddingBottom: 96,
        paddingHorizontal: 32,
    },
});
