import Boom from 'boom';

import { AchievementModel } from '@server/database/achievements';

export const getAchievement = async (id: string) => {
    const achievement = await AchievementModel.findById(id);

    if (achievement) {
        return achievement;
    } else {
        throw Boom.badRequest('Invalid id');
    }
};
