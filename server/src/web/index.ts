import express from 'express';

import { initializeMathRoutes } from './math/routes';
import { initializeUsersRoutes } from './users/routes';
import { initializeClassroomRoutes } from './classroom/routes';

export const initializeRoutes = (app: express.Application) => {
    initializeMathRoutes(app);
    initializeUsersRoutes(app);
    initializeClassroomRoutes(app);
};
