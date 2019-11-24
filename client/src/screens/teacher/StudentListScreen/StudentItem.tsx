import { faChartLine, faSync } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StyledIconButton } from '@client/components/ButtonIcon';
import { actions } from '@client/store';

interface IStudentItemProps {
    id: string;
    name: string;
}

export const StudentItem = (props: IStudentItemProps) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.name}</Text>
            <StyledIconButton
                icon={faChartLine}
                styles={{ marginLeft: 'auto' }}
                styleAttr="secondary"
                onPress={() =>
                    dispatch(actions.teacher.setCurrentStudent(props.id))
                }
            />
            <StyledIconButton
                icon={faSync}
                styleAttr="primary"
                styles={{ marginLeft: 4 }}
                onPress={() =>
                    dispatch(actions.teacher.setCurrentStudent(props.id))
                }
            />
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
