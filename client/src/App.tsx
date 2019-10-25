/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import { StudentSignUpScreen } from './screens/auth/StudentSignUpScreen';
import { TeacherSignUpScreen } from './screens/auth/TeacherSignUpScreen';
import { UserSelectionScreen } from './screens/auth/UserSelectionScreen';
import { WelcomeScreen } from './screens/auth/WelcomeScreen';

import { StudentHome } from './screens/student/StudentHomeScreen';
import { StudentProblem } from './screens/student/StudentProblemScreen';

import { TeacherHome } from './screens/teacher/TeacherHomeScreen';

const AuthStack = createStackNavigator(
    {
        StudentSignUp: {
            screen: StudentSignUpScreen,
        },
        TeacherSignUp: {
            screen: TeacherSignUpScreen,
        },
        UserSelection: {
            screen: UserSelectionScreen,
        },
        Welcome: {
            screen: WelcomeScreen,
        },
    },
    { initialRouteName: 'Welcome', transitionConfig: () => fromRight() }
);

const StudentStack = createStackNavigator(
    {
        Problem: {
            screen: StudentProblem,
        },
        StudentHome: {
            screen: StudentHome,
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
