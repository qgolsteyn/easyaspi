import { useCavy } from 'cavy';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledButton } from '@client/components/Button';
import { StyledHeader } from '@client/components/Header';
import { colors } from '@client/constants/colors';
import { actions, selectors } from '@client/store';

import bg1 from '../../assets/bg1.png';

import fatal from '../../assets/fatal.png';
import noWifi from '../../assets/noWifi.png';

export const ErrorModal = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectors.nav.getErrorInfo);

    const img = error.type === 'noWifi' ? noWifi : fatal;

    const testHook = useCavy();

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <View style={styles.loadingView}>
                    <StyledHeader>{error.name}</StyledHeader>
                    <Text style={styles.description}>{error.description}</Text>
                    <Image
                        source={img}
                        style={{
                            height: 400,
                            resizeMode: 'contain',
                            width: '100%',
                        }}
                    />
                    <StyledButton
                        text={error.action}
                        onPress={() => dispatch(actions.nav.goBack())}
                        ref={testHook('Error')}
                    />
                </View>
            </View>
        </Background>
    );
};

ErrorModal.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    description: {
        color: 'white',
        fontFamily: 'josefin-sans',
        fontSize: 24,
        textAlign: 'center',
    },
    loadingView: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        width: '100%',
    },
});
