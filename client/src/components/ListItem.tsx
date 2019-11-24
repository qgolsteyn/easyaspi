import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@client/constants/colors';

import { Icon } from './Icon';

interface IListItemProps {
    icon?: string;
    text: string | number;
    extra: Array<{
        text: string | number;
        color: string;
    }>;
}

export const ListItem = (props: IListItemProps) => {
    return (
        <View style={styles.type}>
            {props.icon && (
                <Icon backgroundColor={colors.inputs} text={props.icon} />
            )}
            <Text style={styles.typeText}>{props.text}</Text>
            {props.extra.map((extra, index) => (
                <Icon
                    key={index}
                    backgroundColor={extra.color}
                    font="small"
                    shape="round"
                    text={extra.text}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    type: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    typeList: {
        display: 'flex',
        flex: 1,
        marginBottom: 16,
        width: '100%',
    },
    typeText: {
        color: '#333',
        flex: 1,
        fontFamily: 'josefin-sans',
        fontSize: 20,
        marginLeft: 8,
        marginTop: 4,
    },
});
