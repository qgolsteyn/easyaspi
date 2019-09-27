/**
 * This file specifies a demo component for demonstration purposes
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { UserSelectionScreen } from './screens/UserSelectionScreen';

const AppNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
    },
    UserSelection: {
        screen: UserSelectionScreen,
    },
});

export const App = createAppContainer(AppNavigator);
