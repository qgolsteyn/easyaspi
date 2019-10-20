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
import { TeacherHomeScreen } from './screens/TeacherHomeScreen';
import { StudentProblemScreen } from './screens/StudentProblemScreen';

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
        TeacherHomeScreen: {
            screen: TeacherHomeScreen,
        },
        StudentProblemScreen:{
            screen: StudentProblemScreen,
        },
    },
    { initialRouteName: 'StudentProblemScreen', transitionConfig: () => fromRight() }
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
