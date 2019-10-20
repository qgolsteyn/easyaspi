import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface IStyledCard {
    title?: string;
    style?: Object;
    children?: React.ReactNode | React.ReactNode[];
}

export const StyledCard = (props: IStyledCard) => {
    return (
        <View style={{ ...styles.cardWrapper, ...props.style }}>
            <View style={styles.cardContainer}>
                <View style={styles.cardContent}>
                    {props.title && (
                        <Text style={styles.title}>{props.title}</Text>
                    )}
                    {props.children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: 4,
        marginBottom: 4,
        borderRadius: 8,
        backgroundColor: '#CCC',
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
    },
    cardContent: {
        width: '100%',
        backgroundColor: '#FFF',
        display: 'flex',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        color: '#333',
    },
});
