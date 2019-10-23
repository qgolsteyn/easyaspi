import * as React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import * as Haptic from 'expo-haptics';

import { colors } from '@client/constants/colors';

interface IStyledButton {
    loading?: boolean;
    text: string;
    styles?: Object;
    styleAttr?: 'primary' | 'secondary' | 'success' | 'error';
    onPress?: () => void;
}

export const StyledButton = (props: IStyledButton) => {
    const [focus, setFocus] = React.useState(false);

    const color = React.useMemo(() => {
        switch (props.styleAttr) {
            case 'secondary':
                return colors.secondary;
            case 'error':
                return colors.error;
            case 'success':
                return colors.success;
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
            default:
                return colors.primaryDark;
        }
    }, [props.styleAttr]);

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
                onPressIn={() => {
                    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
                    setFocus(true);
                }}
                onPressOut={() => setFocus(false)}
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
                    ) : (
                        <Text style={styles.text}>{props.text}</Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
        height: 64,
        paddingBottom: 4,
        borderRadius: 8,
        marginBottom: 4,
    },
    button: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    textContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        fontFamily: 'josefin-sans-bold',
        fontSize: 24,
        color: '#fff',
        paddingBottom: 4,
    },
});
