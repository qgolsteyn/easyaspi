import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IStyledForm {
    backgroundColor: string;
    children: React.ReactNode | React.ReactNode[];
}

export const StyledForm = (props: IStyledForm) => {
    return (
        <KeyboardAwareScrollView
            style={{ width: '100%', height: '100%' }}
            enableOnAndroid={true}
            enableAutomaticScroll={false}
        >
            <View
                style={{
                    ...styles.wrapper,
                    backgroundColor: props.backgroundColor,
                }}
            >
                {props.children}
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 32,
        width: '100%',
    },
});
