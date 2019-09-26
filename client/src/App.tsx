/**
 * This file specifies a demo component for demonstration purposes
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { selectors, actions } from './store';

export const App = () => {
    const [showProblem, setState] = useState(true);
    const problem = useSelector(selectors.demo.getProblem);
    const solution = useSelector(selectors.demo.getSolution);

    return (
        <View style={styles.container}>
            <Text
                onPress={() => {
                    setState(false);
                }}
            >
                {showProblem ? problem : solution}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
