import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    text: {
        color: '#fff',
        fontFamily: 'amatic-sc',
        fontSize: 64,
    },
    wrapper: {
        alignItems: 'center',
        borderRadius: 8,
        display: 'flex',
        height: 48,
        justifyContent: 'center',
        marginRight: 8,
        marginTop: 8,
        paddingBottom: 8,
        width: 48,
    },
});
