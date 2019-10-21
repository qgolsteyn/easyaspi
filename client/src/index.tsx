/**
 * Entry point of the app
 */

import { registerRootComponent, AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import { createStore, actions } from './store';
import { App } from './App';

import JosefinSans from '../assets/fonts/JosefinSans-Regular.ttf';
import JosefinSansBold from '../assets/fonts/JosefinSans-Bold.ttf';
import AmaticSC from '../assets/fonts/AmaticSC-Regular.ttf';

const store = createStore();

const Entry = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Font.loadAsync({
            'josefin-sans': JosefinSans,
            'josefin-sans-bold': JosefinSansBold,
            'amatic-sc': AmaticSC,
        }).then(() => {
            setLoading(false);
        });
    });

    return loading ? (
        <AppLoading />
    ) : (
        <Provider store={store}>
            <App ref={nav => store.dispatch(actions.nav.setNavigator(nav!))} />
        </Provider>
    );
};

registerRootComponent(Entry);
