/**
 * Entry point of the app
 */

import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import { Provider } from 'react-redux';

import { App } from './App';

import { actions, createStore } from './store';

import AmaticSC from '../assets/fonts/AmaticSC-Regular.ttf';
import JosefinSansBold from '../assets/fonts/JosefinSans-Bold.ttf';
import JosefinSans from '../assets/fonts/JosefinSans-Regular.ttf';

const store = createStore();

const Entry = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        Font.loadAsync({
            'amatic-sc': AmaticSC,
            'josefin-sans': JosefinSans,
            'josefin-sans-bold': JosefinSansBold,
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
