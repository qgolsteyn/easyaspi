import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { selectors, actions } from './store';

export const App = () => {
    const dispatch = useDispatch();
    const demoText = useSelector(selectors.demo.getText);

    return (
        <View style={styles.container}>
            <Text
                onPress={() =>
                    dispatch(actions.demo.changeDemoText('You pressed me!'))
                }
            >
                {demoText}
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
