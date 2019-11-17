import Boom from 'boom';

import { IProblemTypeProgress } from '@server/database/mastery/mastery';
import { IUser, ProblemType } from '../../../client/src/shared/index';
import { convertStringToProblemType, minProblemDifficulty, ProblemDifficulty } from '../../../client/src/shared/models/problem';
import { ClassroomModel, MasteryModel } from '../database';

/*
 * Learning Algorithm method
 * @params: UserPayload: IUser
 * @returns: An object with the next problem type and difficulty
 */
export const nextProblemTypeAndDifficulty = async (userPayload: IUser) => {
    if (!userPayload) {
        throw Boom.badRequest('Parameter userPayload to the method nextProblemTypeAndDifficulty can not be empty');
    }

    if(userPayload.userType !== 'student') {
        throw Boom.badRequest('UserType must be student');
    }

    if(!userPayload.virtualClassroomUid) {
        throw Boom.badData('virtualClassroomUid can not be null');
    }

    if(!userPayload.id) {
        throw Boom.badData('user id can not be null');
    }

    const nextProblemTypes = await findPossibleNextProblemTypes(userPayload.id);

    // last element of nextProblemTypes is the difficulty
    const difficulty = nextProblemTypes.pop();

    const problemsForToday = await getProblemsForClass(userPayload.virtualClassroomUid);

    // send the first matching between problemsForToday and nextProblemTypes
    if(problemsForToday.length !== 0){
        for(const item of nextProblemTypes){
            if(problemsForToday.indexOf(item.valueOf()) !== -1) {
                return {difficulty, problemType: item};
            }
        }
    }

    // if there's no match || problemsForToday is empty, send the first type of nextProblemTypes
    return {difficulty, problemType: nextProblemTypes[0]};
};


export const findPossibleNextProblemTypes = async (studentId: string) => {
    const mastery = await MasteryModel.findById(studentId);
    if (!mastery) {
        throw Boom.notFound('could not find mastery associated with the student id');
    }

    const progress = mastery.progress;

    if(!progress) {
        throw Boom.badData('progress should not be empty');
    }

    let minDifficulty = ProblemDifficulty.G5H;

    // @ts-ignore
    const findMin = (value: IProblemTypeProgress, key: ProblemType) => {
        const problemType = convertStringToProblemType(key);
        const progressForProblemType = progress.get(problemType);

        if(typeof progressForProblemType === 'undefined') {
            throw Boom.badData('progress can not be undefined');
        }

        const difficulty = progressForProblemType.difficulty;

        minDifficulty = minProblemDifficulty(difficulty, minDifficulty);
    };

    progress.forEach(findMin);

    const nextProblemTypes: Array<ProblemType | ProblemDifficulty> = [];

    // @ts-ignore
    // find all the problemTypes with minimum difficulty
    const findAllProblemTypesMinDifficulty = (value: IProblemTypeProgress, key: ProblemType) => {
        const problemType = convertStringToProblemType(key);
        const progressForProblemType = progress.get(problemType);

        if(typeof progressForProblemType === 'undefined') {
            throw Boom.badData('progress can not be undefined');
        }

        const difficulty = progressForProblemType.difficulty;

        if(difficulty.valueOf() === minDifficulty.valueOf()) {
            nextProblemTypes.push(key);
        }
    };

    progress.forEach(findAllProblemTypesMinDifficulty);

    // sort it in ascending order using the formula CurDifPoints + attempted
    nextProblemTypes.sort((a,b) => {
        const aProblemType = convertStringToProblemType(a);
        const bProblemType = convertStringToProblemType(b);
        const aProgress = progress.get(aProblemType);
        const bProgress = progress.get(bProblemType);

        if(typeof aProgress === 'undefined' || typeof bProgress === 'undefined') {
            throw Boom.badData('progress can not be undefined');
        }

        return (aProgress.currentDifficultyPoints + aProgress.currentDifficultyAttempts) -
        (bProgress.currentDifficultyPoints + bProgress.currentDifficultyAttempts);
    });

    // last element is the minDifficulty
    nextProblemTypes.push(minDifficulty);

    return nextProblemTypes;
};

export const getProblemsForClass = async (virtualClassroomUid: string) => {
    const classroom = await ClassroomModel.findById(virtualClassroomUid);

    if(!classroom) {
        throw Boom.notFound(`classroom not found with id ${virtualClassroomUid}`);
    }

    return classroom.problemsForToday;
};
