//Todo convert require statements to ES6

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { connectToDB } from './models';
import { initializeRoutes } from './routes';

const PORT = 3000;

export const initializeApp = async () => {
    const app = express();

    app.use(bodyParser.json());
    initializeRoutes(app);

    await connectToDB();

    try {
        await app.listen(PORT);
        console.log('Server listening on port 3000');
    } catch (e) {
        console.error(e);
    }

    return app;
};
