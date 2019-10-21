import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface IIconProps {
    backgroundColor: string;
    text: string;
}

export const Icon = (props: IIconProps) => {
    return (
        <View
            style={{
                ...styles.wrapper,
                backgroundColor: props.backgroundColor,
            }}
        >
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingBottom: 8,
        marginTop: 8,
        marginRight: 8,
    },
    text: {
        fontFamily: 'amatic-sc',
        fontSize: 64,
        color: '#fff',
    },
});
