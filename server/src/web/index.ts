import express from 'express';

import { initializeAuthRoutes } from './authRoutes';
import { initializeMasteryRoutes } from './masteryRoutes';
import { initializeMathRoutes } from './mathRoutes';
import { initializeUsersRoutes } from './userRoutes';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeAuthRoutes(app);
    initializeUsersRoutes(app);
    initializeMasteryRoutes(app);
};
