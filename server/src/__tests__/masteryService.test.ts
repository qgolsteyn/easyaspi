const mockingoose = require('mockingoose').default;

import { MasteryModel } from '../database/mastery/mastery';
import { mastery } from '../database/mockData';
import { ProblemType } from '../../../client/src/shared/models/problem';
import { updateMastery } from '../service/masteryService';

test('Check if mastery writes to db', async () => {
    mockingoose(MasteryModel).toReturn(mastery, 'findOne');
    mockingoose(MasteryModel).toReturn(mastery, 'save');

    // this really can't be tested via unit tests because it's void, the
    // only changes are in database
    await updateMastery('123', ProblemType.ADDITION, true);
});
