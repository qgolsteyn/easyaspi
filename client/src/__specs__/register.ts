import { TestScope } from 'cavy';

import {
    apiMockSetup,
    loginStudent,
    loginTeacher,
    noCurrentUser,
    noWifiRegister,
    registerStudent,
    registerTeacher,
    wrongPasscodeStudent,
} from './api';

const SMALL_DELAY = 100;

export const registerSpec = () => (spec: TestScope) => {
    spec.describe('Register', () => {
        spec.it('registers a student', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            registerStudent(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Student');
            await spec.fillIn('StudentRegister.Name', 'Test User');
            await spec.fillIn('StudentRegister.ClassroomName', 'APSC100');
            await spec.fillIn('StudentRegister.ClassroomPasscode', '1234');

            await spec.press('StudentRegister.Submit');
            await spec.pause(SMALL_DELAY);

            await spec.exists('StudentHomeScreen.Header');
        });

        spec.it('handle wrong classroom passcode', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            wrongPasscodeStudent(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Student');
            await spec.fillIn('StudentRegister.Name', 'Test User');
            await spec.fillIn('StudentRegister.ClassroomName', 'APSC100');
            await spec.fillIn('StudentRegister.ClassroomPasscode', '1234');

            await spec.press('StudentRegister.Submit');
            await spec.pause(SMALL_DELAY);

            await spec.exists('Error');
        });

        spec.it('handle invalid name for student registration', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            registerStudent(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Student');
            await spec.fillIn('StudentRegister.Name', 'Test User1243');
            await spec.fillIn('StudentRegister.ClassroomName', 'APSC100');
            await spec.fillIn('StudentRegister.ClassroomPasscode', '1234');

            await spec.press('StudentRegister.Submit');
            await spec.pause(SMALL_DELAY);

            await spec.exists('StudentRegister.ErrorName');
        });

        spec.it(
            'handle invalid classroom name for student registration',
            async () => {
                const mock = apiMockSetup();
                noCurrentUser(mock);
                registerStudent(mock);

                await spec.press('Welcome.SignIn');
                await spec.press('UserSelection.Student');
                await spec.fillIn('StudentRegister.Name', 'Test User');
                await spec.fillIn(
                    'StudentRegister.ClassroomName',
                    'APSC100*##$2',
                );
                await spec.fillIn('StudentRegister.ClassroomPasscode', '1234');

                await spec.press('StudentRegister.Submit');
                await spec.pause(SMALL_DELAY);

                await spec.exists('StudentRegister.ErrorClassroomName');
            },
        );

        spec.it(
            'handle invalid classroom passcode for student registration',
            async () => {
                const mock = apiMockSetup();
                noCurrentUser(mock);
                registerStudent(mock);

                await spec.press('Welcome.SignIn');
                await spec.press('UserSelection.Student');
                await spec.fillIn('StudentRegister.Name', 'Test User');
                await spec.fillIn('StudentRegister.ClassroomName', 'APSC100');
                await spec.fillIn(
                    'StudentRegister.ClassroomPasscode',
                    '1234abc',
                );

                await spec.press('StudentRegister.Submit');
                await spec.pause(SMALL_DELAY);

                await spec.exists('StudentRegister.ErrorClassroomPasscode');
            },
        );

        spec.it('registers a teacher', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            registerTeacher(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Teacher');
            await spec.fillIn('TeacherRegister.Name', 'Test User');
            await spec.fillIn('TeacherRegister.ClassroomName', 'APSC100');
            await spec.fillIn('TeacherRegister.ClassroomPasscode', '1234');

            await spec.press('TeacherRegister.Submit');

            await spec.pause(SMALL_DELAY);

            await spec.exists('TeacherHomeScreen.Header');
        });

        spec.it('handle invalid name for teacher registration', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            registerTeacher(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Teacher');
            await spec.fillIn('TeacherRegister.Name', 'Test User1243');
            await spec.fillIn('TeacherRegister.ClassroomName', 'APSC100');
            await spec.fillIn('TeacherRegister.ClassroomPasscode', '1234');

            await spec.press('TeacherRegister.Submit');
            await spec.pause(SMALL_DELAY);

            await spec.exists('TeacherRegister.ErrorName');
        });

        spec.it(
            'handle invalid classroom name for teacher registration',
            async () => {
                const mock = apiMockSetup();
                noCurrentUser(mock);
                registerTeacher(mock);

                await spec.press('Welcome.SignIn');
                await spec.press('UserSelection.Teacher');
                await spec.fillIn('TeacherRegister.Name', 'Test User');
                await spec.fillIn(
                    'TeacherRegister.ClassroomName',
                    'APSC100*##$2',
                );
                await spec.fillIn('TeacherRegister.ClassroomPasscode', '1234');

                await spec.press('TeacherRegister.Submit');
                await spec.pause(SMALL_DELAY);

                await spec.exists('TeacherRegister.ErrorClassroomName');
            },
        );

        spec.it(
            'handle invalid classroom passcode for teacher registration',
            async () => {
                const mock = apiMockSetup();
                noCurrentUser(mock);
                registerTeacher(mock);

                await spec.press('Welcome.SignIn');
                await spec.press('UserSelection.Teacher');
                await spec.fillIn('TeacherRegister.Name', 'Test User');
                await spec.fillIn('TeacherRegister.ClassroomName', 'APSC100');
                await spec.fillIn(
                    'TeacherRegister.ClassroomPasscode',
                    '1234abc',
                );

                await spec.press('TeacherRegister.Submit');
                await spec.pause(SMALL_DELAY);

                await spec.exists('TeacherRegister.ErrorClassroomPasscode');
            },
        );

        spec.it('handle no internet connection', async () => {
            const mock = apiMockSetup();
            noCurrentUser(mock);
            noWifiRegister(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Teacher');
            await spec.fillIn('TeacherRegister.Name', 'Test User');
            await spec.fillIn('TeacherRegister.ClassroomName', 'APSC100');
            await spec.fillIn('TeacherRegister.ClassroomPasscode', '1234');

            await spec.press('TeacherRegister.Submit');

            await spec.pause(SMALL_DELAY);

            await spec.exists('Error');
        });
    });

    spec.describe('Login', () => {
        spec.it('logins a student', async () => {
            const mock = apiMockSetup();
            loginStudent(mock);

            await spec.press('Welcome.SignIn');

            await spec.exists('StudentHomeScreen.Header');
        });

        spec.it('logins a teacher', async () => {
            const mock = apiMockSetup();
            loginTeacher(mock);

            await spec.press('Welcome.SignIn');

            await spec.exists('TeacherHomeScreen.Header');
        });

        spec.it('handle no internet connection', async () => {
            const mock = apiMockSetup();
            noWifiRegister(mock);

            await spec.press('Welcome.SignIn');

            await spec.exists('Error');
        });
    });
};
