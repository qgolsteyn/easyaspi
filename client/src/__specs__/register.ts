import { TestScope } from 'cavy';

import {
    apiMockSetup,
    noCurrentUser,
    registerStudent,
    registerTeacher,
    loginStudent,
    loginTeacher,
} from './api';

export default (spec: TestScope) => {
    const mock = apiMockSetup();
    spec.describe('Register', () => {
        spec.it('registers a student', async () => {
            noCurrentUser(mock);
            registerStudent(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Student');
            await spec.fillIn('StudentRegister.Name', 'Test User');
            await spec.fillIn('StudentRegister.ClassroomName', 'APSC100');
            await spec.fillIn('StudentRegister.ClassroomPasscode', '1234');

            await spec.press('StudentRegister.Submit');
            await spec.pause(1000);

            await spec.exists('StudentHomeScreen.Header');
        });

        spec.it('registers a teacher', async () => {
            noCurrentUser(mock);
            registerTeacher(mock);

            await spec.press('Welcome.SignIn');
            await spec.press('UserSelection.Teacher');
            await spec.fillIn('TeacherRegister.Name', 'Test User');
            await spec.fillIn('TeacherRegister.ClassroomName', 'APSC100');
            await spec.fillIn('TeacherRegister.ClassroomPasscode', '1234');

            await spec.press('TeacherRegister.Submit');

            await spec.pause(1000);

            await spec.exists('TeacherHomeScreen.Header');
        });
    });

    spec.describe('login', () => {
        spec.it('logins a student', async () => {
            loginStudent(mock);

            await spec.press('Welcome.SignIn');

            await spec.exists('StudentHomeScreen.Header');
        });

        spec.it('logins a teacher', async () => {
            loginTeacher(mock);

            await spec.press('Welcome.SignIn');

            await spec.exists('TeacherHomeScreen.Header');
        });
    });
};
