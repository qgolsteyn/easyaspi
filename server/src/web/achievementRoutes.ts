import Boom from 'boom';
import express from 'express';

import { achievementService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';
import { IAchievement } from '@shared/index';

export const initializeAchievementRoutes = (app: express.Application) => {
    const achievementRouter = express.Router();
    app.use('/achievements', achievementRouter);

    achievementRouter.get(
        '/',
        enhanceHandler({ protect: true })(async (_, user) => {
            if (user && user.achievements) {
                const achievements: IAchievement[] = [];

                for (const id of user.achievements) {
                    achievements.push(
                        await achievementService.getAchievement(id),
                    );
                }

                return [HTTP_CODE.OK, achievements];
            } else {
                throw Boom.badRequest('User cannot have achievements');
            }
        }),
    );

    achievementRouter.get(
        '/info',
        enhanceHandler({ protect: true })(async req => {
            const { id } = req.body;

            if (!id) {
                throw Boom.badRequest('Missing id in request body');
            }

            const achievement = await achievementService.getAchievement(id);

            return [HTTP_CODE.OK, achievement];
        }),
    );
};
