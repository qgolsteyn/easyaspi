import express from 'express';

import { initializeMathRoutes } from './math/routes';
import { initializeUsersRoutes } from './users/routes';
import { initializeNotificationRoutes } from './notification/routes';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeUsersRoutes(app);
    initializeNotificationRoutes(app);
};
