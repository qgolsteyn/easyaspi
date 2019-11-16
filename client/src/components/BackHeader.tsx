import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { actions } from '@client/store';
import { StyledIconButton } from './ButtonIcon';

interface IStyledBackHeaderProps {
    title: string;
}

export const StyledBackHeader = (props: IStyledBackHeaderProps) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.header}>
            <StyledIconButton
                icon={faChevronLeft}
                styleAttr="primary"
                onPress={() => dispatch(actions.nav.goBack())}
            />
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        width: '100%',
    },
    text: {
        color: '#fff',
        fontFamily: 'josefin-sans',
        fontSize: 24,
        marginLeft: 16,
        marginTop: 4,
    },
});
