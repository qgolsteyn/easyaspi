import express from 'express';

import { initializeClassroomRoutes } from './classroom';
import { initializeMathRoutes } from './math';
import { initializeNotificationRoutes } from './notification';
import { initializeUsersRoutes } from './users';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeUsersRoutes(app);
    initializeNotificationRoutes(app);
    initializeClassroomRoutes(app);
};
