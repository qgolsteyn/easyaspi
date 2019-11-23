import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IIconProps {
    backgroundColor: string;
    text: string | number;
    shape?: 'round' | 'square';
    font?: 'normal' | 'small';
}

export const Icon = (props: IIconProps) => {
    return (
        <View
            style={{
                ...styles.wrapper,
                backgroundColor: props.backgroundColor,
                borderRadius: props.shape === 'round' ? 24 : 8,
            }}
        >
            <Text
                style={props.font === 'small' ? styles.textSmall : styles.text}
            >
                {props.text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontFamily: 'amatic-sc',
        fontSize: 64,
    },
    textSmall: {
        color: '#fff',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
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
