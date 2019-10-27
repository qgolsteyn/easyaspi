import express from 'express';

import { initializeUsersRoutes } from './auth';
import { initializeClassroomRoutes } from './classroom';
import { initializeMathRoutes } from './math';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeUsersRoutes(app);
    initializeClassroomRoutes(app);
};
