import Boom from 'boom';

import { IUser } from '@shared/index';
import { ClassroomModel, MasteryModel } from '@server/database';


/*
 * Learning Algorithm method
 * @params: UserPayload: IUser
 * @returns: An object with the next problem type and difficulty
 */
export const nextProblemTypeAndDifficulty = async (userPayload: IUser) => {
    if(userPayload.userType.toString().toLowerCase() !== 'student')
        throw Boom.badRequest('can not get nextProblem for teacher');

    if(!userPayload.virtualClassroomUid)
        throw Boom.badData('virtualClassroomUid can not be null');

    if(!userPayload.id)
        throw Boom.badData('user id can not be null');

    let nextProblemTypes = findPossibleNextProblemTypes(userPayload.id);

    // last element of nextProblemTypes is the difficulty
    const difficulty = nextProblemTypes.pop();

    const problemsForToday = getProblemsForClass(userPayload.virtualClassroomUid);

    // send the first matching between problemsForToday and nextProblemTypes
    if(problemsForToday.length !== 0){
        for(const item of nextProblemTypes){
            if(problemsForToday.indexOf(item) !== -1)
                return {problemType: item,
                    difficulty: difficulty};
        }
    }

    // if there's no match || problemsForToday is empty, send the first type of nextProblemTypes
    return {problemType: nextProblemTypes[0],
            difficulty: difficulty};
};


const findPossibleNextProblemTypes = (studentId: string) => {
    const mastery = MasteryModel.findById(studentId);
    if (!mastery)
        throw Boom.notFound('could not find mastery associated with the student id');

    let progress = mastery.progress;
    if(!progress)
        throw Boom.badData('progress should not be empty');

    let minDifficulty = 'g11h';

    const map = ['g1e','g1m','g1h','g2e','g2m','g2h','g3e','g3m','g3h',
                'g4e','g4m','g4h','g5e','g5m','g5h','g6e','g6m','g6h',
                'g7e','g7m','g7h','g8e','g8m','g8h','g9e','g9m','g9h',
                'g10e','g10m','g10h','g11e','g11m','g11h'];

    let problemTypes = Object.keys(progress);

    // find minimum difficulty
    for (const item of problemTypes){
        let difficulty = progress.item.difficulty;
        if(map.indexOf(difficulty) < map.indexOf(minDifficulty))
            minDifficulty = difficulty;
    }

    let nextProblemTypes = [];

    // find all the problemTypes with minimum difficulty
    for (const item of problemTypes){
        let difficulty = progress.item.difficulty;
        if(difficulty.toLowerCase() === minDifficulty.toLowerCase())
            nextProblemTypes.push(item);
    }

    // sort it in ascending order using the formula CurDifPoints + attempted
    nextProblemTypes.sort((a,b) =>
        (progress[a].currentDifficultyPoints + progress[a].attempted) -
        (progress[b].currentDifficultyPoints + progress[b].attempted));

    // last element is the minDifficulty
    nextProblemTypes.push(minDifficulty);

    return nextProblemTypes;
};

const getProblemsForClass = (virtualClassroomUid: string) => {
    const classroom = ClassroomModel.findById(virtualClassroomUid);
    return classroom.problemsForToday;
};