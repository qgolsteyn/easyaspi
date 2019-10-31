import express from 'express';

import { initializeAuthRoutes } from './auth';
import { initializeMathRoutes } from './math';
import { initializeUsersRoutes } from './user';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeAuthRoutes(app);
    initializeUsersRoutes(app);
};
