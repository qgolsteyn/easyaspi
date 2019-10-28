import Boom from 'boom';

import { ClassroomModel } from '@server/database';
import { cleanMongoDocument } from '@server/utils/mongo';

import { IClassroom } from '@shared/index';

export const createClassroom = async (classroomPayload: IClassroom) => {
    const classroom = new ClassroomModel({
        name: classroomPayload.name,
        password: classroomPayload.passcode,
    });

    await classroom.save();

    return cleanMongoDocument(classroom) as IClassroom;
};

export const authenticateToClassroom = async (classroomPayload: IClassroom) => {
    const classroom = await ClassroomModel.findOne({
        name: classroomPayload.name,
    });

    if (classroom && classroom.passcode === classroomPayload.passcode) {
        return true;
    } else {
        throw Boom.unauthorized('Invalid classroom name or passcode');
    }
};
