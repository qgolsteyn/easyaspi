import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';

import { createStore } from './store';
import { App } from './App';

const store = createStore();

const Entry = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

registerRootComponent(Entry);
