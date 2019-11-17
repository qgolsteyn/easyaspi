import { baseApi } from '@client/store/sagas/api/url';
import MockAdapter from 'axios-mock-adapter';

const appData = {
    classroom: {
        name: 'APSC100',
        passcode: '1234',
        students: new Array(7).fill(undefined).map((_, i) => ({
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

    mock.onGet('/classroom/students').reply(() => [
        200,
        appData.classroom.students,
    ]);

    return mock;
};

export const noCurrentUser = (mock: MockAdapter) => {
    mock.onGet('/user/current').reply(200, undefined);

    mock.onPost('/auth').reply(200, {
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
            200,
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

export const registerTeacher = (mock: MockAdapter) => {
    mock.onPost('/user/register').reply(() => {
        return [
            200,
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
    mock.onGet('/user/current').reply(200, undefined);

    mock.onPost('/auth').reply(200, {
        accessToken: 'access_token',
        user: appData.user[0],
    });
};

export const loginTeacher = (mock: MockAdapter) => {
    mock.onGet('/user/current').reply(200, undefined);

    mock.onPost('/auth').reply(200, {
        accessToken: 'access_token',
        user: appData.user[1],
    });
};
