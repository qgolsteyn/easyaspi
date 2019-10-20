import mongoose from 'mongoose';

export { GeneratedProblemModel } from './models/math/generatedProblem';
export { ProblemTemplateModel } from './models/math/problemTemplate';
export { TeacherTemplateModel } from './models/users/teacherTemplate';

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
