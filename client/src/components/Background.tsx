import * as React from 'react';
import {
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';

interface IBackgroundProps {
    backgroundColor?: string;
    backgroundImage?: ImageSourcePropType;
    children: React.ReactNode | React.ReactNodeArray;
}

export const Background = (props: IBackgroundProps) => {
    return props.backgroundImage !== undefined ? (
        <ImageBackground
            source={props.backgroundImage}
            style={{
                ...styles.bg,
                backgroundColor: props.backgroundColor || '#fff',
            }}
        >
            {props.children}
        </ImageBackground>
    ) : (
        <View
            style={{
                backgroundColor: props.backgroundColor || '#fff',
                ...styles.bg,
            }}
        >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        height: '100%',
        width: '100%',
    },
});
