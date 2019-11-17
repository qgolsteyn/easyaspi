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

    spec.describe('Math problems', () => {});
};
