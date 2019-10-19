import * as React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import { colors } from '../constants/colors';

interface IStyledInput {
    styles?: Object;
    label?: string;
    placeholder?: string;
    onChange?: (text: string) => void;
}

export const StyledInput = (props: IStyledInput) => {
    return (
        <View style={{ ...styles.wrapper, ...props.styles }}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={props.onChange}
                        placeholder={props.placeholder || 'Write here!'}
                        placeholderTextColor="#C7DAEF"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
        height: 64,
        paddingBottom: 4,
        marginBottom: 4,
        borderRadius: 8,
        backgroundColor: colors.inputsDark,
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.inputs,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        color: '#fff',
    },
    label: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        color: '#fff',
        marginBottom: 16,
    },
});
