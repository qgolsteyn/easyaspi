import { wrap } from 'cavy';
import * as Haptic from 'expo-haptics';
import * as React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { colors } from '@client/constants/colors';

interface IStyledButton {
    loading?: boolean;
    text: string | React.ReactElement;
    styles?: object;
    styleAttr?: 'primary' | 'secondary' | 'success' | 'error' | 'transparent';
    onPress?: () => void;
}

export const StyledButton = wrap((props: IStyledButton) => {
    const [focus, setFocus] = React.useState(false);

    const color = React.useMemo(() => {
        switch (props.styleAttr) {
            case 'secondary':
                return colors.secondary;
            case 'error':
                return colors.error;
            case 'success':
                return colors.success;
            case 'transparent':
                return 'transparent';
            default:
                return colors.primary;
        }
    }, [props.styleAttr]);

    const colorDark = React.useMemo(() => {
        switch (props.styleAttr) {
            case 'secondary':
                return colors.secondaryDark;
            case 'error':
                return colors.errorDark;
            case 'success':
                return colors.successDark;
            case 'transparent':
                return 'transparent';
            default:
                return colors.primaryDark;
        }
    }, [props.styleAttr]);

    const onButtonPressIn = () => {
        Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
        setFocus(true);
    };
    const onButtonPressOut = () => {
        setFocus(false);
    };

    return (
        <View
            style={{
                ...styles.wrapper,
                ...props.styles,
                backgroundColor: colorDark,
            }}
        >
            <TouchableWithoutFeedback
                style={styles.button}
                onPressIn={onButtonPressIn}
                onPressOut={onButtonPressOut}
                onPress={!props.loading ? props.onPress : undefined}
            >
                <View
                    style={{
                        ...styles.textContainer,
                        backgroundColor:
                            focus || props.loading ? colorDark : color,
                    }}
                >
                    {props.loading ? (
                        <ActivityIndicator size="large" color="#FFF" />
                    ) : typeof props.text === 'string' ? (
                        <Text style={styles.text}>{props.text}</Text>
                    ) : (
                        props.text
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        paddingBottom: 4,
    },
    textContainer: {
        alignItems: 'center',
        borderRadius: 8,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    wrapper: {
        borderRadius: 8,
        height: 64,
        marginBottom: 4,
        paddingBottom: 4,
        position: 'relative',
        width: '100%',
    },
});
