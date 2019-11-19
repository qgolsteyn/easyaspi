import Boom from 'boom';

import { ClassroomModel, UserModel } from '@server/database';
import { IClassroom, ProblemType, UserType } from '@shared/index';
import { convertStringToProblemType } from '@shared/models/problem';

export const createClassroom = async (classroomPayload: IClassroom) => {
    const classroom = new ClassroomModel({
        name: classroomPayload.name,
        passcode: classroomPayload.passcode,
    });

    const newClassroom = await classroom.save();
    if (newClassroom) {
        return newClassroom;
    } else {
        throw Boom.badRequest(
            'A classroom already exists with this given name and passcode',
        );
    }
};

export const authenticateToClassroom = async (classroomPayload: IClassroom) => {
    const classroom = await ClassroomModel.findOne({
        name: classroomPayload.name,
        passcode: classroomPayload.passcode,
    });

    if (classroom && classroom.passcode === classroomPayload.passcode) {
        return classroom.id;
    } else {
        throw Boom.unauthorized('Invalid classroom name or passcode');
    }
};

export const getStudents = async (classroomId: string) => {
    const students = await UserModel.find({
        userType: UserType.STUDENT,
        virtualClassroomUid: classroomId,
    });

    return students;
};

export const getClassroom = async (classroomId: string) => {
    const classroom = await ClassroomModel.findById(classroomId);

    if(!classroom){
        throw Boom.notFound(`No classroom found with the id ${classroomId}`);
    }

    return classroom;
};

export const updateClassroom = async (classroomPayload: IClassroom) => {

    if(classroomPayload.problemsForToday.length !== 0){
        for(const problemTypeStr of classroomPayload.problemsForToday){
            const problemType = convertStringToProblemType(problemTypeStr);
            if (problemType === ProblemType.UNKNOWN){
                throw Boom.badData(`${problemTypeStr} is not a valid problemType`)
            }
        }
    }

    const classroom = await ClassroomModel.updateOne({
            name: classroomPayload.name,
        passcode: classroomPayload.passcode,
    }, classroomPayload);

    if(!classroom){
        throw Boom.notFound('Could not update the classroom');
    }

    return classroom;
};
