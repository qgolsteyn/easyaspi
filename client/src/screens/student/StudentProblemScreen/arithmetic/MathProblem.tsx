import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumberFormat from 'react-number-format';

interface IMathProblemProps {
    operators: string[];
    operands: number[];
}

export const MathProblem = (props: IMathProblemProps) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.operator}>
                {props.operators.map((operator, index) => (
                    <Text
                        key={`${operator}${index}`}
                        style={styles.operatorText}
                    >
                        {operator}
                    </Text>
                ))}
            </View>
            <View style={styles.values}>
                {props.operands.map((operand, index) => (
                    <NumberFormat
                        key={`${operand}${index}`}
                        value={operand}
                        displayType="text"
                        thousandSeparator={true}
                        renderText={value => (
                            <Text style={styles.valueText}>{value}</Text>
                        )}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    operator: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: 64,
    },
    operatorText: {
        color: '#333',
        fontSize: 48,
        marginTop: -4,
    },
    valueText: {
        color: '#333',
        fontSize: 48,
        marginTop: -4,
    },
    values: {
        alignItems: 'flex-end',
        display: 'flex',
    },
    wrapper: {
        borderBottomColor: '#333',
        borderBottomWidth: 4,
        display: 'flex',
        flexDirection: 'row',
    },
});
