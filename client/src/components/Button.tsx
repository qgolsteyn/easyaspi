import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import { colors } from '../constants/colors';

interface IStyledButton {
    text: string;
    onPress?: () => void;
}

export const StyledButton = (props: IStyledButton) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                onPress={() => {}}
                style={styles.button}
                onPressOut={props.onPress}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
        height: 64,
        paddingBottom: 4,
        borderRadius: 8,
        backgroundColor: colors.primaryDark,
    },
    button: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    textContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 4,
    },
    text: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        color: '#fff',
    },
});
