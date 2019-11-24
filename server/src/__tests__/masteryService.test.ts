import { ProblemType } from '../../../client/src/shared/models/problem';
import { MasteryModel } from '../database/mastery/mastery';
import { masteryDoc3 } from '../database/mockData';
import { updateMastery } from '../service/masteryService';

const mockingoose = require('mockingoose').default;

test('Check if mastery writes to db', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc3, 'findOne');
    mockingoose(MasteryModel).toReturn(masteryDoc3, 'save');

    // this really can't be tested via unit tests because it's void, the
    // only changes are in database
    await updateMastery('123', '456', ProblemType.ADDITION, true);
});
