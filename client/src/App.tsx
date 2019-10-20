/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { UserSelectionScreen } from './screens/UserSelectionScreen';
import { StudentSignUpScreen } from './screens/StudentSignUpScreen';
import { TeacherSignUpScreen } from './screens/TeacherSignUpScreen';

const AuthStack = createStackNavigator(
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
        TeacherSignUp: {
            screen: TeacherSignUpScreen,
        },
    },
    { initialRouteName: 'Welcome', transitionConfig: () => fromRight() }
);

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
);

export const App = createAppContainer(SwitchNavigator);
