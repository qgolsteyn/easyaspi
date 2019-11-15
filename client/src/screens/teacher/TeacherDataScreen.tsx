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

export const TeacherData = () => {
    const currentUser = useSelector(selectors.user.getCurrentUser);
    const userName = (currentUser ? currentUser.name : '') || '';

    return (
        <div className="App">
        <BarChart/>
        </div>
    );
};

TeacherData.navigationOptions = () => ({
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
