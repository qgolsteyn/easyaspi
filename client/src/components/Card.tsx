import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface IStyledCard {
    styles?: Object;
    children?: React.ReactNode | React.ReactNode[];
}

export const StyledCard = (props: IStyledCard) => {
    return (
        <View style={{ ...styles.cardWrapper, ...props.styles }}>
            <View style={styles.cardContainer}>
                <View style={styles.cardContent}>{props.children}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        position: 'relative',
        width: '100%',
        height: 64,
        paddingBottom: 4,
        marginBottom: 4,
        borderRadius: 8,
        backgroundColor: '#CCC',
    },
    cardContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    cardContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
});
