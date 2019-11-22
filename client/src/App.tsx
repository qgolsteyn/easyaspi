/**
 * This file specifies a demo component for demonstration purposes
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import { ErrorModal } from './screens/ErrorModal';

import { StudentSignUpScreen } from './screens/auth/StudentSignUpScreen';
import { TeacherSignUpScreen } from './screens/auth/TeacherSignUpScreen';
import { UserSelectionScreen } from './screens/auth/UserSelectionScreen';
import { WelcomeScreen } from './screens/auth/WelcomeScreen';

import { StudentAchievements } from './screens/student/StudentAchievements';
import { StudentHome } from './screens/student/StudentHomeScreen';
import { StudentProblem } from './screens/student/StudentProblemScreen';

import { ClassroomStatistics } from './screens/teacher/ClassroomStatisticsScreen';
import { StudentList } from './screens/teacher/StudentListScreen';
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
    { initialRouteName: 'Welcome', transitionConfig: () => fromRight() },
);

const StudentStack = createStackNavigator(
    {
        Achievements: {
            screen: StudentAchievements,
        },
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
    },
);

const TeacherStack = createStackNavigator(
    {
        ClassroomStatistics: {
            screen: ClassroomStatistics,
        },
        StudentsList: {
            screen: StudentList,
        },
        TeacherHome: {
            screen: TeacherHome,
        },
    },
    {
        initialRouteName: 'TeacherHome',
        transitionConfig: () => fromRight(),
    },
);

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthStack,
        Student: StudentStack,
        Teacher: TeacherStack,
    },
    {
        initialRouteName: 'Auth',
    },
);

const RootNavigator = createStackNavigator(
    {
        App: {
            screen: SwitchNavigator,
        },
        Error: {
            screen: ErrorModal,
        },
    },
    {
        headerMode: 'none',
        mode: 'modal',
    },
);

export const App = createAppContainer(RootNavigator);
