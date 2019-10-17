/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft, fromRight } from 'react-navigation-transitions';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { UserSelectionScreen } from './screens/UserSelectionScreen';
import { StudentSignUpScreen } from './screens/StudentSignUpScreen';
import {AuthScreen} from './screens/AuthScreen';

const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen,
        },
        UserSelection: {
            screen: UserSelectionScreen,
        },
        StudentSignUp: {
            screen: StudentSignUpScreen,
        },
        Auth: {
            screen: AuthScreen,
        },
    },
    { initialRouteName: 'Welcome', transitionConfig: () => fromRight() }
);

export const App = createAppContainer(AppNavigator);
