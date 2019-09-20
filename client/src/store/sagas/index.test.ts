import { expectSaga } from 'redux-saga-test-plan';

import { initializeSagas } from '.';
import { demoStart } from './demo';

describe('initialize sagas', () => {
    it('should start demo saga', () => {
        return expectSaga(initializeSagas)
            .spawn(demoStart)
            .run();
    });
});
