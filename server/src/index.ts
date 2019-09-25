//Todo convert require statements to ES6

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { mathRouter } from './routes/math';

const DB_CONNECTION =
    'mongodb://test1:iuf6nkfy273YTP5@cluster0-shard-00-00-ckvam.mongodb.net:27017,cluster0-shard-00-01-ckvam.mongodb.net:27017,cluster0-shard-00-02-ckvam.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use('/math', mathRouter);

mongoose
    .connect(DB_CONNECTION, { useNewUrlParser: true }, err => {
        if (err) {
            console.error(err);
        }

        console.log('DB connection successful');
    })
    .then(() => {
        app.listen(PORT, err => {
            if (err) {
                console.error(err);
            }
            console.log('Server started successfully on port ' + PORT);
        });
    });
