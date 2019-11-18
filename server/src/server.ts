import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import boom from 'express-boom';
import { Server } from 'http';

import { connectToDB } from './database';
import { initializeRoutes } from './web';

const DEFAULT_PORT = 8097;

const PORT = process.env.PORT || DEFAULT_PORT;

const log = debug('pi:server');

export const initializeApp = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(boom());

    initializeRoutes(app);

    await connectToDB();

    let server: Server;
    try {
        server = app.listen(PORT);
        log(`Server listening on port ${PORT}`);
    } catch (e) {
        throw e;
    }

    return [app, server] as [express.Application, Server];
};
