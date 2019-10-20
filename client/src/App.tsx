/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import { WelcomeScreen } from './screens/WelcomeScreen';

import { UserSelectionScreen } from './screens/auth/UserSelectionScreen';
import { StudentSignUpScreen } from './screens/auth/StudentSignUpScreen';
import { TeacherSignUpScreen } from './screens/auth/TeacherSignUpScreen';
import { TeacherLoginScreen } from './screens/auth/TeacherLoginScreen';

import { StudentHome } from './screens/StudentHomeScreen';
import { TeacherHome } from './screens/TeacherHomeScreen';
import { StudentProblem } from './screens/StudentProblemScreen';

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
        TeacherLogin: {
            screen: TeacherLoginScreen,
        },
    },
    { initialRouteName: 'Welcome', transitionConfig: () => fromRight() }
);

const StudentStack = createStackNavigator(
    {
        StudentHome: {
            screen: StudentHome,
        },
        Problem: {
            screen: StudentProblem,
        },
    },
    {
        initialRouteName: 'StudentHome',
        transitionConfig: () => fromRight(),
    }
);

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthStack,
        Student: StudentStack,
        Teacher: TeacherHome,
    },
    {
        initialRouteName: 'Auth',
    }
);

export const App = createAppContainer(SwitchNavigator);
