//Todo convert require statements to ES6

import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';

import { connectToDB } from './models';
import { initializeRoutes } from './routes';

const PORT = process.env['SERVER_PORT'] || 3000;

export const initializeApp = async () => {
    const app = express();

    app.use(bodyParser.json());
    initializeRoutes(app);

    await connectToDB();

    let server: Server;
    try {
        server = await app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (e) {
        console.error(e);
        throw e;
    }

    return [app, server] as [express.Application, Server];
};
