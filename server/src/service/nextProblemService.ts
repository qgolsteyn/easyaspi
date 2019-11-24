import Boom from 'boom';

import { IProblemTypeProgress } from '@server/database/mastery/mastery';
import { sendPushNotification } from '@server/service/userService';
import {
    convertStringToProblemType,
    minProblemDifficulty,
    ProblemDifficulty,
} from '@shared/models/problem';
import { IUser, ProblemType } from '../../../client/src/shared/index';
import { ClassroomModel, MasteryModel, UserModel } from '../database';

/*
 * Learning Algorithm method
 * @params: UserPayload: IUser
 * @returns: An object with the next problem type and difficulty
 */
export const nextProblemTypeAndDifficulty = async (userPayload: IUser) => {
    if (userPayload.userType !== 'student') {
        throw Boom.badRequest('UserType must be student');
    }

    if (!userPayload.virtualClassroomUid) {
        throw Boom.badData('virtualClassroomUid can not be null');
    }

    if (!userPayload.id) {
        throw Boom.badData('user id can not be null');
    }

    const nextProblemTypesAndMinDifficulty = await findPossibleNextProblemTypes(
        userPayload,
    );

    const difficulty = nextProblemTypesAndMinDifficulty.minDifficulty;

    const nextProblemTypes = nextProblemTypesAndMinDifficulty.nextProblemTypes;

    const problemsForToday = await getProblemsForClass(
        userPayload.virtualClassroomUid,
    );

    // send the first matching between problemsForToday and nextProblemTypes
    if (problemsForToday.length !== 0) {
        for (const item of nextProblemTypes) {
            if (problemsForToday.indexOf(item.valueOf()) !== -1) {
                return { difficulty, problemType: item };
            }
        }
    }

    // if there's no match || problemsForToday is empty, send the first type of nextProblemTypes
    return { difficulty, problemType: nextProblemTypes[0] };
};

/*
returns an object consists nextProblemTypes and minDifficulty
 */
export const findPossibleNextProblemTypes = async (userPayload: IUser) => {
    const mastery = await MasteryModel.findOne({
        studentId: userPayload.id,
    });
    if (!mastery) {
        const additionProblemType = convertStringToProblemType('addition');
        return {
            minDifficulty: ProblemDifficulty.G1E,
            nextProblemTypes: [additionProblemType],
        };
    }

    const classroom = await ClassroomModel.findById(
        userPayload.virtualClassroomUid,
    );
    if (!classroom) {
        throw Boom.notFound(
            `could not find classroom associated with the id ${userPayload.virtualClassroomUid}`,
        );
    }

    if (classroom.numDailyProblems <= mastery.numDailyCorrectAnswers) {
        const teacher = await UserModel.findOne({virtualClassroomUid: userPayload.virtualClassroomUid, userType: 'teacher'});

        if (!teacher){
            throw Boom.notFound(`no teacher found for the class ${userPayload.virtualClassroomUid}`);
        }

        if(!teacher.pushToken){
            throw Boom.badData('teacher must have a push token to send a notification');
        }

        await sendPushNotification(
            `${userPayload.name} has completed the daily problem set`,
            teacher.pushToken
        );

        throw Boom.badRequest(
            `student with id ${userPayload.id} has already answered ${mastery.numDailyCorrectAnswers} questions correctly`,
        );
    }

    const progress = mastery.progress;

    if (!progress) {
        throw Boom.badData('progress should not be empty');
    }

    let minDifficulty = ProblemDifficulty.G5H;

    // @ts-ignore
    const findMin = (value: IProblemTypeProgress, key: ProblemType) => {
        if (typeof value === 'undefined') {
            throw Boom.badData('progress can not be undefined');
        }

        const difficulty = value.difficulty;

        minDifficulty = minProblemDifficulty(difficulty, minDifficulty);
    };

    progress.forEach(findMin);

    const nextProblemTypes: ProblemType[] = [];

    // @ts-ignore
    // find all the problemTypes with minimum difficulty
    const findAllProblemTypesMinDifficulty = (
        value: IProblemTypeProgress,
        key: ProblemType,
    ) => {
        if (typeof value === 'undefined') {
            throw Boom.badData('progress can not be undefined');
        }

        const difficulty = value.difficulty;

        if (difficulty.valueOf() === minDifficulty.valueOf()) {
            nextProblemTypes.push(key);
        }
    };

    progress.forEach(findAllProblemTypesMinDifficulty);

    // sort it in ascending order using the formula CurDifPoints + attempted
    nextProblemTypes.sort((a, b) => {
        const aProblemType = convertStringToProblemType(a);
        const bProblemType = convertStringToProblemType(b);
        const aProgress = progress.get(aProblemType);
        const bProgress = progress.get(bProblemType);

        if (
            typeof aProgress === 'undefined' ||
            typeof bProgress === 'undefined'
        ) {
            throw Boom.badData('progress can not be undefined');
        }

        return (
            aProgress.currentDifficultyPoints +
            aProgress.currentDifficultyAttempts -
            (bProgress.currentDifficultyPoints +
                bProgress.currentDifficultyAttempts)
        );
    });

    return {
        minDifficulty,
        nextProblemTypes,
    };
};

export const getProblemsForClass = async (virtualClassroomUid: string) => {
    const classroom = await ClassroomModel.findById(virtualClassroomUid);

    if (!classroom) {
        throw Boom.notFound(
            `classroom not found with id ${virtualClassroomUid}`,
        );
    }

    return classroom.problemsForToday;
};

export const getAllProblemTypes = async () => {
    const values = Object.values(ProblemType);
    values.pop();

    return values;
};
