import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Background } from '@client/components/Background';
import { StyledCard } from '@client/components/Card';
import { StyledHeader } from '@client/components/Header';

import { colors } from '@client/constants/colors';

import { selectors } from '@client/store';

import {BarChart} from '@client/components/Barchart';

import bg1 from '../../../assets/bg1.png';

export const TeacherHome = () => {
    const currentUser = useSelector(selectors.user.getCurrentUser);
    const userName = (currentUser ? currentUser.name : '') || '';

    state = {
        data: [12, 5, 6, 6, 9, 10],
        width: 700,
        height: 500,
        id: root
    }

    return (
        <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
        </div>
    );
};

TeacherHome.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    studentItem: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        width: '100%',
    },
});
