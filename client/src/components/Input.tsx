import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TextInputProps,
} from 'react-native';

import { colors } from '../constants/colors';

interface IStyledInput extends TextInputProps {
    style?: Object;
    label?: string;
    error?: boolean;
}

export const StyledInput = (props: IStyledInput) => {
    return (
        <View
            style={{
                ...styles.wrapper,
                ...props.style,
            }}
        >
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View
                style={{
                    ...styles.inputWrapper,
                    ...(props.error ? { backgroundColor: '#FF0000' } : {}),
                }}
            >
                <View
                    style={{
                        ...styles.inputContainer,
                        ...(props.error ? { backgroundColor: '#FF0000' } : {}),
                    }}
                >
                    <TextInput
                        {...props}
                        style={styles.input}
                        placeholder={props.placeholder || 'Write here...'}
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
        borderRadius: 8,
        backgroundColor: colors.inputs,
    },
    input: {
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingVertical: 8,
        paddingHorizontal: 16,
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
