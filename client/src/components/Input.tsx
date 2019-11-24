import { useCavy, wrap } from 'cavy';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextProps,
    View,
} from 'react-native';

import { colors } from '@client/constants/colors';

interface IStyledInput extends TextInputProps {
    style?: object;
    label?: string;
    error?: string;
    errorRef?: any;
}

const TestableText = wrap<TextProps>(Text);

export const StyledInput = wrap((props: IStyledInput) => {
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
                    ...(props.error
                        ? { backgroundColor: colors.errorDark }
                        : {}),
                }}
            >
                <View
                    style={{
                        ...styles.inputContainer,
                        ...(props.error
                            ? { backgroundColor: colors.error }
                            : {}),
                    }}
                >
                    <TextInput
                        {...props}
                        style={styles.input}
                        placeholder={props.placeholder || 'Write here...'}
                        placeholderTextColor={props.error ? '#FFF' : '#C7DAEF'}
                    />
                </View>
            </View>
            {props.error && (
                <TestableText ref={props.errorRef} style={styles.error}>
                    {props.error}
                </TestableText>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    error: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
    input: {
        color: '#fff',
        display: 'flex',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%',
    },
    inputContainer: {
        backgroundColor: colors.inputs,
        borderRadius: 8,
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    inputWrapper: {
        backgroundColor: colors.inputsDark,
        borderRadius: 8,
        height: 64,
        marginBottom: 4,
        paddingBottom: 4,
        position: 'relative',
        width: '100%',
    },
    label: {
        color: '#fff',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        marginBottom: 16,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
});
