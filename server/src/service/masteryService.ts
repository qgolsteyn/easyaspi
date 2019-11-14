import { IProblemTypeProgress, MasteryModel } from '@server/database/mastery';
import {
    getNextProblemDifficulty,
    getPreviousProblemDifficulty,
    ProblemDifficulty,
    ProblemType,
} from '@shared/models/problem';

const PointsThresholdPerDifficulty = 9;

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
        problemTypeProgress = updateProblemTypeProgression(
            isSuccess,
            problemTypeProgress,
        );
        mastery.progress.set(problemType, problemTypeProgress);
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
function updateProblemTypeProgression(
    isSuccess: boolean,
    problemTypeProgress: IProblemTypeProgress,
): IProblemTypeProgress {
    if (isSuccess) {
        // if user has reached the threshold for their current difficulty and has not reached
        // max difficulty, bump them up to the next difficulty
        if (
            problemTypeProgress.currentDifficultyPoints ===
                PointsThresholdPerDifficulty &&
            problemTypeProgress.difficulty !== ProblemDifficulty.G5H
        ) {
            problemTypeProgress.currentDifficultyPoints = 0;
            problemTypeProgress.currentDifficultyAttempts = 0;
            problemTypeProgress.totalPoints++;
            problemTypeProgress.difficulty = getNextProblemDifficulty(
                problemTypeProgress.difficulty,
            );
        } else {
            problemTypeProgress.currentDifficultyPoints++;
            problemTypeProgress.currentDifficultyAttempts++;
            problemTypeProgress.totalPoints++;
        }
    } else {
        if (problemTypeProgress.currentDifficultyPoints === 0) {
            // if user has lost all their points in the current difficulty and has not reached the lowest
            // difficulty, kick them down to the previous difficulty
            if (problemTypeProgress.difficulty !== ProblemDifficulty.G1E) {
                problemTypeProgress.currentDifficultyPoints = PointsThresholdPerDifficulty;
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
    }
    return problemTypeProgress;
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
