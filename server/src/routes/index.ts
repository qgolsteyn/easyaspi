import express from 'express';

import { initializeMathRoutes } from './math';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
};
