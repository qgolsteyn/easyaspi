import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IMathProblemProps {
    operators: string[];
    operands: number[];
}

export const MathProblem = (props: IMathProblemProps) => {
    const sortedOperands = props.operands.slice().sort((a, b) => a - b);
    const operator = props.operators[0];

    return (
        <View style={styles.wrapper}>
            {operator === 'square' ? (
                <View style={styles.squareWrapper}>
                    <View style={styles.squareRow}>
                        <Text style={styles.textSide}>{props.operands[0]}</Text>
                        <View style={styles.square} />
                    </View>
                    <Text style={styles.textBottom}>{props.operands[0]}</Text>
                </View>
            ) : operator === 'rectangle' ? (
                <View style={styles.squareWrapper}>
                    <View style={styles.squareRow}>
                        <Text style={styles.textSide}>{sortedOperands[0]}</Text>
                        <View style={styles.rectangle} />
                    </View>
                    <Text style={styles.textBottom}>{sortedOperands[1]}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        borderColor: '#333',
        borderWidth: 4,
        height: 92,
        marginRight: 32,
        width: 128,
    },
    square: {
        borderColor: '#333',
        borderWidth: 4,
        height: 128,
        marginRight: 32,
        width: 128,
    },
    squareRow: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    squareWrapper: {
        alignItems: 'flex-end',
        display: 'flex',
    },

    textBottom: {
        color: '#333',
        fontSize: 24,
        marginRight: 32,
        marginTop: 8,
        textAlign: 'center',
        width: 128,
    },
    textSide: {
        color: '#333',
        fontSize: 24,
        marginRight: 8,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
});
