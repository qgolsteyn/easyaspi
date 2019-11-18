import { TestScope } from 'cavy';
import { Store } from 'redux';

import {
    apiMockSetup,
    loginStudent,
    loginTeacher,
    noCurrentUser,
    registerStudent,
    registerTeacher,
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
    });
};
