import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingFragment = () => (
    <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="#FFF" />
    </View>
);

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
});
