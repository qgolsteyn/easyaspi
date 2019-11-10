import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Haptic from 'expo-haptics';
import * as React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { colors } from '@client/constants/colors';

interface IStyledIconButton {
    styles?: object;
    text: string;
    icon: unknown;
    styleAttr?: 'primary' | 'secondary' | 'success' | 'error';
    onPress?: () => void;
}

export const StyledIconButton = (props: IStyledIconButton) => {
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
            }}
        >
            <TouchableWithoutFeedback
                style={styles.button}
                onPressIn={onButtonPressIn}
                onPressOut={onButtonPressOut}
                onPress={props.onPress}
            >
                <View
                    style={{
                        ...styles.textContainer,
                        backgroundColor: focus ? '#CCC' : 'white',
                    }}
                >
                    <FontAwesomeIcon
                        icon={props.icon}
                        size={24}
                        color={color}
                        style={{ marginRight: 16 }}
                    />
                    <Text style={styles.text}>{props.text}</Text>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size={16}
                        color="#333"
                        style={{ marginLeft: 'auto' }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    text: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 20,
        paddingBottom: 6,
    },
    textContainer: {
        alignItems: 'center',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        padding: 16,
        width: '100%',
    },
    wrapper: {
        backgroundColor: '#CCC',
        borderRadius: 8,
        height: 64,
        marginBottom: 4,
        paddingBottom: 4,
        position: 'relative',
        width: '100%',
    },
});
