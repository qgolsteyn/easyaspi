import * as React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import * as Haptic from 'expo-haptics';

import { colors } from '../constants/colors';

interface IStyledButton {
    loading?: boolean;
    text: string;
    styles?: Object;
    onPress?: () => void;
}

export const StyledButton = (props: IStyledButton) => {
    const [focus, setFocus] = React.useState(false);

    return (
        <View style={{ ...styles.wrapper, ...props.styles }}>
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
                            focus || props.loading
                                ? colors.primaryDark
                                : colors.primary,
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
        backgroundColor: colors.primaryDark,
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
