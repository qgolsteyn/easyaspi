/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { UserSelectionScreen } from './screens/UserSelectionScreen';
import { StudentSignUpScreen } from './screens/StudentSignUpScreen';
import { TeacherSignUpScreen } from './screens/TeacherSignUpScreen';

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
        TeacherSignUp: {
            screen: TeacherSignUpScreen,
        },
    },
    { initialRouteName: 'StudentHome', transitionConfig: () => fromRight() }
);

export const App = createAppContainer(AppNavigator);
