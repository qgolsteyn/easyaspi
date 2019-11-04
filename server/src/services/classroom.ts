import Boom from 'boom';

import { ClassroomModel } from '@server/database';
import { IClassroom } from '@shared/index';

export const createClassroom = async (classroomPayload: IClassroom) => {
    const classroom = new ClassroomModel({
        name: classroomPayload.name,
        passcode: classroomPayload.passcode,
    });

    const newClassroom = await classroom.save();
    if (newClassroom) {
        return newClassroom;
    } else {
        throw Boom.badRequest('A classroom already exists with this given name and passcode');
    }
};

export const authenticateToClassroom = async (classroomPayload: IClassroom) => {
    const classroom = await ClassroomModel.findOne({
        name: classroomPayload.name,
    });

    if (classroom && classroom.passcode === classroomPayload.passcode) {
        return classroom.id;
    } else {
        throw Boom.unauthorized('Invalid classroom name or passcode');
    }
};
