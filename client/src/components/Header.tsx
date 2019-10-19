import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface IStyledHeader {
    children: string;
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
        width: '100%',
        marginVertical: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'amatic-sc',
        fontSize: 64,
        color: '#fff',
    },
});
