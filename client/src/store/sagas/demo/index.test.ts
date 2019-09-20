import { expectSaga } from 'redux-saga-test-plan';

import { demoStart } from '.';
import { actions } from '../..';

describe('initialize sagas', () => {
    it('should start demo saga', () => {
        return expectSaga(demoStart)
            .put(actions.demo.changeDemoText('Hello from Saga land!'))
            .run();
    });
});
