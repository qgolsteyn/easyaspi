import { faChartLine, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StyledIconButton } from '@client/components/ButtonIcon';

interface IStudentItemProps {
    id: string;
    name: string;
}

export const StudentItem = (props: IStudentItemProps) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.name}</Text>
            <StyledIconButton
                icon={faChartLine}
                styles={{ marginLeft: 'auto' }}
                styleAttr="secondary"
            />
            <StyledIconButton icon={faPaperPlane} styles={{ marginLeft: 8 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#333',
        fontFamily: 'josefin-sans',
        fontSize: 16,
        paddingBottom: 4,
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        width: '100%',
    },
});
