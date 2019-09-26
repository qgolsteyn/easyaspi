import mongoose from 'mongoose';

export { ProblemModel } from './problem';
export { TemplateModel } from './template';

const DB_CONNECTION =
    process.env['DB_CONNECTION'] || 'mongodb://localhost:27017/test';

export const connectToDB = () => {
    return mongoose
        .connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Db connected...'));
};
