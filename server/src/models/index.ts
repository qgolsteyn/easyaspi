import mongoose from 'mongoose';

export { ProblemModel } from './problem';
export { TemplateModel } from './template';

const DB_CONNECTION =
    'mongodb://test1:iuf6nkfy273YTP5@cluster0-shard-00-00-ckvam.mongodb.net:27017,cluster0-shard-00-01-ckvam.mongodb.net:27017,cluster0-shard-00-02-ckvam.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

export const connectToDB = () => {
    return mongoose
        .connect(DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Db connected...'));
};
