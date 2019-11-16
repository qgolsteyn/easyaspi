import {
    IProblemTypeProgress,
    IMastery,
    MasteryModel,
} from '@server/database/mastery/mastery';
import { ViewableProblemTypesModel } from '@server/database/mastery/viewableProblemTypes';
import {
    getNextProblemDifficulty,
    getPreviousProblemDifficulty,
    ProblemDifficulty,
    ProblemType,
    minProblemDifficulty,
} from '@shared/models/problem';

import debug from 'debug';

const log = debug('pi:mastery');

// student must get 10 questions right before moving to next difficulty
const MAX_POINTS_PER_DIFFICULTY = 9;

/**
 * Update the mastery based on the student's result for a problem type.
 * When student has completed pre-reqs for a problem type they 'unlock' it
 * and it will show up in their mastery
 *
 * @param studentIdent studentId, renamed because of a conflict with mastery studentId field
 * @param problemType problem type to update mastery for
 * @param isSuccess whether or not student got problem correct
 */
export async function updateMastery(
    studentIdent: string,
    problemType: ProblemType,
    isSuccess: boolean,
): Promise<void> {
    let mastery = await MasteryModel.findOne({
        studentId: studentIdent,
    });

    if (!mastery) {
        const newMastery = new MasteryModel({
            progress: new Map<string, IProblemTypeProgress>(),
            studentId: studentIdent,
        });
        mastery = await newMastery.save();
    }

    let problemTypeProgress = mastery.progress.get(problemType);
    if (typeof problemTypeProgress === 'undefined') {
        // if app is working correclty, this case should never happen
        const newProblemTypeProgress = createProblemTypeProgression(isSuccess);
        mastery.progress.set(problemType, newProblemTypeProgress);
    } else {
        await updateProblemTypeProgression(
            isSuccess,
            problemType,
            problemTypeProgress,
            mastery,
        );
    }
    await mastery.save();
}

/**
 * Takes in an object of type IProblemTypeProgress and updates the mastery entry depending
 * on whether or not the user go the question right or wrong
 *
 * @param isSuccess whether or not the user got the question correct or not
 * @param problemTypeProgress the IProblemTypeProgress object to update
 */
async function updateProblemTypeProgression(
    isSuccess: boolean,
    problemType: ProblemType,
    problemTypeProgress: IProblemTypeProgress,
    mastery: IMastery,
): Promise<void> {
    if (isSuccess) {
        // if user has reached the threshold for their current difficulty and has not reached
        // max difficulty, bump them up to the next difficulty
        if (
            problemTypeProgress.currentDifficultyPoints ===
                MAX_POINTS_PER_DIFFICULTY &&
            problemTypeProgress.difficulty !== ProblemDifficulty.G5H
        ) {
            problemTypeProgress.currentDifficultyPoints = 0;
            problemTypeProgress.currentDifficultyAttempts = 0;
            problemTypeProgress.totalPoints++;
            problemTypeProgress.difficulty = getNextProblemDifficulty(
                problemTypeProgress.difficulty,
            );

            // updated progress needs to be set before attempting to insert unlocked problem types
            mastery.progress.set(problemType, problemTypeProgress);

            // if any problem types have been unlocked, add them to the progress map
            await insertUnlockedProblemTypes(mastery);
        } else {
            problemTypeProgress.currentDifficultyPoints++;
            problemTypeProgress.currentDifficultyAttempts++;
            problemTypeProgress.totalPoints++;

            mastery.progress.set(problemType, problemTypeProgress);
        }
    } else {
        if (problemTypeProgress.currentDifficultyPoints === 0) {
            // if user has lost all their points in the current difficulty and has not reached the lowest
            // difficulty, kick them down to the previous difficulty
            if (problemTypeProgress.difficulty !== ProblemDifficulty.G1E) {
                problemTypeProgress.currentDifficultyPoints = MAX_POINTS_PER_DIFFICULTY;
                problemTypeProgress.currentDifficultyAttempts = 0;
                problemTypeProgress.totalPoints--;
                problemTypeProgress.difficulty = getPreviousProblemDifficulty(
                    problemTypeProgress.difficulty,
                );
            } else {
                // if student is at 0 points and is in g1e, only attempts is updated
                problemTypeProgress.currentDifficultyAttempts++;
            }
        } else {
            problemTypeProgress.currentDifficultyPoints--;
            problemTypeProgress.currentDifficultyAttempts++;
            problemTypeProgress.totalPoints--;
        }

        mastery.progress.set(problemType, problemTypeProgress);
    }
}

async function insertUnlockedProblemTypes(mastery: IMastery): Promise<void> {
    let lowestDifficulty: ProblemDifficulty = ProblemDifficulty.G5H;
    for (let problemTypeProgress of mastery.progress.values()) {
        lowestDifficulty = minProblemDifficulty(
            lowestDifficulty,
            problemTypeProgress.difficulty,
        );
    }

    let viewableProblemTypes = await ViewableProblemTypesModel.findOne({
        difficulty: lowestDifficulty,
    });

    if (viewableProblemTypes) {
        viewableProblemTypes.problemTypes.forEach(problemType => {
            if (!mastery.progress.has(problemType)) {
                const newProblemTypeProgress = {
                    currentDifficultyAttempts: 0,
                    currentDifficultyPoints: 0,
                    difficulty: lowestDifficulty,
                    totalPoints: 0,
                } as IProblemTypeProgress;

                mastery.progress.set(problemType, newProblemTypeProgress);
            }
        });
    } else {
        log(
            'No viewableProblemTypes document found for ' +
                lowestDifficulty.valueOf(),
        );
    }
}

/**
 * Creates a new object of type IProblemTypeProgress and populates fields
 * based on whether student got previous answer right or wrong
 *
 * @param isSuccess whether or not the user got the question correct or not
 */
function createProblemTypeProgression(
    isSuccess: boolean,
): IProblemTypeProgress {
    let newProblemTypeProgress;
    if (isSuccess) {
        newProblemTypeProgress = {
            currentDifficultyAttempts: 1,
            currentDifficultyPoints: 1,
            difficulty: ProblemDifficulty.G1E,
            totalPoints: 1,
        } as IProblemTypeProgress;
    } else {
        newProblemTypeProgress = {
            currentDifficultyAttempts: 1,
            currentDifficultyPoints: 0,
            difficulty: ProblemDifficulty.G1E,
            totalPoints: 0,
        } as IProblemTypeProgress;
    }
    return newProblemTypeProgress;
}
