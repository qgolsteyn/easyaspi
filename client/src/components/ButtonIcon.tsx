import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { wrap } from 'cavy';
import * as Haptic from 'expo-haptics';
import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { colors } from '@client/constants/colors';

const ICON_SIZE = 24;

interface IStyledButton {
    icon: unknown;
    styles?: object;
    styleAttr?: 'primary' | 'secondary' | 'success' | 'error' | 'transparent';
    onPress?: () => void;
}

export const StyledIconButton = wrap((props: IStyledButton) => {
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
        <TouchableWithoutFeedback
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={props.onPress}
        >
            <View
                style={{
                    ...styles.wrapper,
                    ...props.styles,
                    backgroundColor: focus ? colorDark : color,
                }}
            >
                <FontAwesomeIcon
                    icon={props.icon}
                    size={ICON_SIZE}
                    color="#fff"
                    style={{ marginRight: 2 }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        borderRadius: 24,
        display: 'flex',
        height: 48,
        justifyContent: 'center',
        marginBottom: 8,
        width: 48,
    },
});
