import { useCavy } from 'cavy';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledHeader } from '@client/components/Header';
import { actions } from '@client/store';

import done from '../../../../assets/done.png';

export const DoneFragment = () => {
    const dispatch = useDispatch();
    const testHook = useCavy();

    return (
        <View style={styles.loadingView}>
            <StyledHeader>Done for the day!</StyledHeader>
            <Image
                source={done}
                style={{
                    height: 420,
                    resizeMode: 'contain',
                    width: '100%',
                }}
            />
            <StyledButton
                text="View results"
                onPress={() => dispatch(actions.nav.goToScreen('StudentHome'))}
                ref={testHook('Achievements')}
            />
            <StyledButton
                text="Back"
                onPress={() => dispatch(actions.nav.goToScreen('StudentHome'))}
                ref={testHook('MathDone.Back')}
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
