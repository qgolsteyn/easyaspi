import express from 'express';

import { initializeMathRoutes } from './math/routes';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
};
