import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledHeader } from '@client/components/Header';
import { actions } from '@client/store';

import done from '../../../../assets/done.png';

export const DoneFragment = () => {
    const dispatch = useDispatch();

    return (
        <View style={styles.loadingView}>
            <StyledHeader>Done for the day!</StyledHeader>
            <Image
                source={done}
                style={{
                    height: 400,
                    resizeMode: 'contain',
                    width: '100%',
                }}
            />
            <StyledButton
                text="Back"
                onPress={() => dispatch(actions.nav.goToScreen('StudentHome'))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
});
