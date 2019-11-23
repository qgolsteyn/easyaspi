import {
    IMastery,
    IProblemTypeProgress,
    MasteryModel,
} from '@server/database/mastery/mastery';
import { ProblemMinimumDifficultiesModel } from '@server/database/mastery/problemMinimumDifficulties';
import {
    getNextProblemDifficulty,
    getPreviousProblemDifficulty,
    minProblemDifficulty,
    ProblemDifficulty,
    ProblemType,
} from '@shared/models/problem';

import debug from 'debug';
const log = debug('pi:mastery');

// student must get 10 questions right before moving to next difficulty tier
const MAX_POINTS_PER_DIFFICULTY = 9;

// these 2 are unimplemented as of now
const DISABLED_PROBLEM_TYPES = [ProblemType.AREA, ProblemType.PERIMETER];

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

    const problemTypeProgress = mastery.progress.get(problemType);
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
            const problemDifficultyMapping = await ProblemMinimumDifficultiesModel.findOne(
                {
                    problemTypes: problemType.valueOf(),
                },
            );
            if (problemDifficultyMapping) {
                // if user has lost all their points in the current difficulty and has not reached the lowest
                // difficulty for that problem type, kick them down to the previous difficulty
                if (
                    problemTypeProgress.difficulty !==
                    problemDifficultyMapping.difficulty
                ) {
                    problemTypeProgress.currentDifficultyPoints = MAX_POINTS_PER_DIFFICULTY;
                    problemTypeProgress.currentDifficultyAttempts = 0;
                    problemTypeProgress.totalPoints--;
                    problemTypeProgress.difficulty = getPreviousProblemDifficulty(
                        problemTypeProgress.difficulty,
                    );
                } else {
                    // if student is at 0 points and is in the lowest difficulty for
                    // this problem type, only attempts is updated
                    problemTypeProgress.currentDifficultyAttempts++;
                }
            } else {
                // this function and overarching endpoint should not fail because
                // of this data error. In the event this error happens, continue so
                // user experience is not disrupted
                problemTypeProgress.currentDifficultyAttempts++;
                log(
                    'No problem difficulty mapping found for ' +
                        problemType.valueOf(),
                );
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
    for (const problemTypeProgress of mastery.progress.values()) {
        lowestDifficulty = minProblemDifficulty(
            lowestDifficulty,
            problemTypeProgress.difficulty,
        );
    }

    const problemDifficultyMapping = await ProblemMinimumDifficultiesModel.findOne(
        {
            difficulty: lowestDifficulty,
        },
    );

    if (problemDifficultyMapping) {
        problemDifficultyMapping.problemTypes.forEach(problemType => {
            if (
                !mastery.progress.has(problemType) &&
                !DISABLED_PROBLEM_TYPES.includes(problemType)
            ) {
                const newProblemTypeProgress = {
                    currentDifficultyAttempts: 0,
                    currentDifficultyPoints: 0,
                    difficulty: lowestDifficulty,
                    totalPoints: 0,
                } as IProblemTypeProgress;

                mastery.progress.set(problemType, newProblemTypeProgress);
            }
        });
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
