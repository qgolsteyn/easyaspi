import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StyledIconButton } from '@client/components/ButtonIcon';

interface IStudentItemProps {
    name: string;
    active: boolean;
    onPress: () => void;
}

export const ProblemTypeItem = (props: IStudentItemProps) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.name}</Text>
            <StyledIconButton
                icon={props.active ? faCheck : faTimes}
                styles={{ marginLeft: 'auto' }}
                styleAttr={props.active ? 'success' : 'error'}
                onPress={props.onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 18,
        paddingBottom: 8,
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 48,
        marginBottom: 4,
        width: '100%',
    },
});
