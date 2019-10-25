import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';

import { connectToDB } from './database';
import { initializeRoutes } from './routes';

const PORT = process.env.PORT || 8080;

export const initializeApp = async () => {
    const app = express();

    app.use(bodyParser.json());
    initializeRoutes(app);

    await connectToDB();

    let server: Server;
    try {
        server = app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    } catch (e) {
        console.error(e);
        throw e;
    }

    return [app, server] as [express.Application, Server];
};
