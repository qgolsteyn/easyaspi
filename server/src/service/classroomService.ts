import Boom from 'boom';

import { ClassroomModel, UserModel } from '@server/database';
import * as errors from '@shared/errors';
import { IClassroom, ProblemType, UserType } from '@shared/index';
import { IClassroomWithId } from '@shared/models/classroom';
import { convertStringToProblemType } from '@shared/models/problem';

const NUM_OF_DAILY_PROBLEMS = 20;

export const createClassroom = async (classroomPayload: IClassroom) => {
    const classroom = new ClassroomModel({
        name: classroomPayload.name,
        numDailyProblems: NUM_OF_DAILY_PROBLEMS,
        onlineResources: classroomPayload.onlineResources,
        passcode: classroomPayload.passcode,
        problemsForToday: classroomPayload.problemsForToday,
    });

    const newClassroom = await classroom.save();
    if (newClassroom) {
        return newClassroom;
    } else {
        throw Boom.badRequest(errors.DUPLICATE_CLASSROOM);
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
        throw Boom.unauthorized(errors.WRONG_CLASS_INFO);
    }
};

export const getStudents = async (classroomId: string) => {
    return UserModel.find({
        userType: UserType.STUDENT,
        virtualClassroomUid: classroomId,
    });
};

export const getClassroom = async (classroomId: string) => {
    const classroom = await ClassroomModel.findById(classroomId);

    if (!classroom) {
        throw Boom.notFound(`No classroom found with the id ${classroomId}`);
    } else {
        return classroom;
    }
};

export const updateClassroom = async (classroomPayload: IClassroomWithId) => {
    if (
        classroomPayload.problemsForToday &&
        classroomPayload.problemsForToday.length !== 0
    ) {
        for (const problemTypeStr of classroomPayload.problemsForToday) {
            const problemType = convertStringToProblemType(problemTypeStr);
            if (problemType === ProblemType.UNKNOWN) {
                throw Boom.badData(
                    `${problemTypeStr} is not a valid problemType`,
                );
            }
        }
    }

    const classroom = await ClassroomModel.findById(classroomPayload._id);

    if (!classroom) {
        throw Boom.notFound(
            `Could not find the classroom with id ${classroomPayload._id}`,
        );
    }

    classroomPayload.name = !classroomPayload.name
        ? classroom.name
        : classroomPayload.name;
    classroomPayload.passcode = !classroomPayload.passcode
        ? classroom.passcode
        : classroomPayload.passcode;
    classroomPayload.numDailyProblems = !classroomPayload.numDailyProblems
        ? classroom.numDailyProblems
        : classroomPayload.numDailyProblems;
    classroomPayload.problemsForToday = !classroomPayload.problemsForToday
        ? classroom.problemsForToday
        : classroomPayload.problemsForToday;
    classroomPayload.onlineResources = !classroomPayload.onlineResources
        ? classroom.onlineResources
        : classroomPayload.onlineResources;

    const classroomNew = await ClassroomModel.findByIdAndUpdate(
        classroomPayload._id,
        classroomPayload,
        { new: true },
    );

    if (!classroomNew) {
        throw Boom.notFound(
            `Could not update the classroom with id ${classroomPayload._id}`,
        );
    } else {
        return classroomNew;
    }
};
