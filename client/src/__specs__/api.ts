import MockAdapter from 'axios-mock-adapter';

import { baseApi } from '@client/store/sagas/api/url';
import * as errors from '@shared/errors';

const NUMBER_OF_STUDENTS = 7;
export const CODE_OK = 200;
export const CODE_UNAUTH = 401;

const appData = {
    classroom: {
        name: 'APSC100',
        numDailyProblems: 10,
        onlineResources: 'http://ubc.ca',
        passcode: '1234',
        students: new Array(NUMBER_OF_STUDENTS).fill(undefined).map((_, i) => ({
            email: 'test@test.com',
            id: String(i),
            name: `Test Student ${i}`,
            pushToken: `token${i}`,
            registered: true,
            userType: 'student',
            virtualClassroomUid: 'classroom',
        })),
    },
    user: [
        {
            email: 'test@test.com',
            id: '1',
            name: 'Test Student',
            pushToken: 'token1',
            registered: true,
            userType: 'student',
            virtualClassroomUid: 'classroom',
        },
        {
            email: 'test@test.com',
            id: '2',
            name: 'Test Teacher',
            pushToken: 'token2',
            registered: true,
            userType: 'teacher',
            virtualClassroomUid: 'classroom',
        },
    ],
};

export const apiMockSetup = () => {
    const mock = new MockAdapter(baseApi);

    mock.onGet('/classroom').reply(() => [CODE_OK, appData.classroom]);

    mock.onGet('/classroom/students').reply(() => [
        CODE_OK,
        appData.classroom.students,
    ]);

    mock.onGet('/mastery/student/statistics').reply(() => [
        CODE_OK,
        {
            numDailyAttempts: 0,
            numDailyCorrectAnswers: 0,
            totalLifetimeAttempts: 24,
            totalLifetimeCorrectAnswers: 12,
            totals: {},
        },
    ]);

    mock.onGet('/mastery/classroom/statistics').reply(() => [
        CODE_OK,
        {
            allStudents: {},
            numDailyAttempts: 0,
            numDailyCorrectAnswers: 0,
            problemTypeStats: {},
            studentsCompleted: 0,
            totalLifetimeAttempts: 24,
            totalLifetimeCorrectAnswers: 12,
        },
    ]);

    mock.onGet('/achievements').reply(() => [
        CODE_OK,
        {
            _id: '5dd83d461c9d44000021103e',
            description: 'You have solved 50 questions correctly!',
            imgUrl:
                'https://raw.githubusercontent.com/qgolsteyn/easyaspi/master/client/assets/icon.png',
            name: '50 hurrays!',
        },
    ]);

    mock.onPost('/mastery/result').reply(CODE_OK);

    mock.onGet('/achievements').reply(() => [
        CODE_OK,
        {
            _id: '5dd83d461c9d44000021103e',
            description: 'You have solved 50 questions correctly!',
            imgUrl:
                'https://raw.githubusercontent.com/qgolsteyn/easyaspi/master/client/assets/icon.png',
            name: '50 hurrays!',
        },
    ]);

    mock.onGet('/math/nextProblem').reply(() => [
        CODE_OK,
        {
            incorrectSolutions: ['5', '7', '8'],
            operands: [1, 1],
            operators: ['+'],
            problem: '1 + 1 =',
            problemType: 'addition',
            solution: ['2'],
        },
    ]);

    mock.onGet('/math/nextProblem').reply(() => [
        CODE_OK,
        {
            incorrectSolutions: ['5', '7', '8'],
            operands: [1, 1],
            operators: ['+'],
            problem: '1 + 1 =',
            problemType: 'addition',
            solution: ['2'],
        },
    ]);

    return mock;
};

export const noCurrentUser = (mock: MockAdapter) => {
    mock.onGet('/user/current').reply(CODE_OK, undefined);

    mock.onPost('/auth').reply(CODE_OK, {
        accessToken: 'access_token',
        user: {
            id: '12345678910',
            name: 'Test User',
            registered: false,
        },
    });
};

export const registerStudent = (mock: MockAdapter) => {
    mock.onPost('/user/register').reply(() => {
        return [
            CODE_OK,
            {
                accessToken: 'access_token',
                user: {
                    id: '12345678910',
                    name: 'Test User',
                    registered: true,
                    userType: 'student',
                    virtualClassroomUid: 'classroom',
                },
            },
        ];
    });
};

export const wrongPasscodeStudent = (mock: MockAdapter) => {
    mock.onPost('/user/register').reply(() => {
        return [CODE_UNAUTH, errors.WRONG_CLASS_INFO];
    });
};

export const noWifiRegister = (mock: MockAdapter) => {
    mock.onGet('/user/current').networkError();
    mock.onPost('/user/register').networkError();
};

export const noWifiMath = (mock: MockAdapter) => {
    mock.onGet('/math/nextProblem').networkError();
};

export const registerTeacher = (mock: MockAdapter) => {
    mock.onPost('/user/register').reply(() => {
        return [
            CODE_OK,
            {
                accessToken: 'access_token',
                user: {
                    id: '12345678910',
                    name: 'Test User',
                    registered: true,
                    userType: 'teacher',
                    virtualClassroomUid: 'classroom',
                },
            },
        ];
    });
};

export const loginStudent = (mock: MockAdapter) => {
    mock.onGet('/user/current').reply(CODE_OK, undefined);

    mock.onPost('/auth').reply(CODE_OK, {
        accessToken: 'access_token',
        user: appData.user[0],
    });
};

export const loginTeacher = (mock: MockAdapter) => {
    mock.onGet('/user/current').reply(CODE_OK, undefined);

    mock.onPost('/auth').reply(CODE_OK, {
        accessToken: 'access_token',
        user: appData.user[1],
    });
};
