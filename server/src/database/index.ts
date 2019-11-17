import debug from 'debug';
import mongoose from 'mongoose';

const log = debug('pi:db');

export { ArithmeticProblemTemplateModel } from './arithmeticProblemTemplate';
export { UserModel } from './users';
export { ClassroomModel } from './classroom';
export { MasteryModel } from './mastery/mastery';
export {
    ProblemMinimumDifficultiesModel as ViewableProblemTypesModel,
} from './mastery/problemMinimumDifficulties';

const DB_CONNECTION =
    process.env.DB_CONNECTION || 'mongodb://localhost:27017/test';

export const connectToDB = () => {
    return mongoose
        .connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => log('Db connected...'))
        .catch(() => {
            throw new Error('Unable to connect to DB');
        });
};
