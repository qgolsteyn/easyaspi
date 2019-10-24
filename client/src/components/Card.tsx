import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IStyledCard {
    title?: string;
    style?: object;
    height?: string | number;
    children?: React.ReactNode | React.ReactNode[];
}

export const StyledCard = (props: IStyledCard) => {
    return (
        <View style={{ ...styles.cardWrapper, ...props.style }}>
            <View style={styles.cardContainer}>
                <View style={{ ...styles.cardContent, height: props.height }}>
                    {props.title ? (
                        <Text style={styles.title}>{props.title}</Text>
                    ) : (
                        undefined
                    )}
                    {props.children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        width: '100%',
    },
    cardContent: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        display: 'flex',
        padding: 16,
        width: '100%',
    },
    cardWrapper: {
        backgroundColor: '#CCC',
        borderRadius: 8,
        marginBottom: 4,
        paddingBottom: 4,
        position: 'relative',
        width: '100%',
    },
    title: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
    },
});
