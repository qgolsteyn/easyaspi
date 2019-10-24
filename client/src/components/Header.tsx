import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IStyledHeader {
    children: string | string[];
}

export const StyledHeader = (props: IStyledHeader) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginVertical: 32,
        width: '100%',
    },
    headerText: {
        color: '#fff',
        fontFamily: 'amatic-sc',
        fontSize: 64,
    },
});
