import { ObjectId } from "bson";
import { ProblemType, ProblemDifficulty } from "@shared/models/problem";
import { MasteryModel, IProblemTypeProgress } from "@server/database/mastery";

const PointsThresholdPerDifficulty = 9;

export async function updateMastery(
    studentId: ObjectId, 
    problemType: ProblemType, 
    isSuccess: boolean
) {
    let mastery = await MasteryModel.findOne({
        studentId: studentId
    })

    if (!mastery) {
        let newMastery = new MasteryModel({
            studentId: studentId,
            progress: new Map<string, IProblemTypeProgress>()
        });
        mastery = await newMastery.save();
    }

    let problemTypeProgress = mastery.progress.get(problemType);
    if (typeof problemTypeProgress === 'undefined') {
        const newProblemTypeProgress = createProblemTypeProgression(isSuccess);
        mastery.progress.set(problemType, newProblemTypeProgress);
    } else {
        problemTypeProgress = updateProblemTypeProgression(isSuccess, problemTypeProgress);
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
function updateProblemTypeProgression(isSuccess: boolean, problemTypeProgress: IProblemTypeProgress): IProblemTypeProgress {
    if (isSuccess) {
        // if user has reached the threshold for their current difficulty and has not reached
        // max difficulty, bump them up to the next difficulty
        if (problemTypeProgress.currentDifficultyPoints === PointsThresholdPerDifficulty 
            && problemTypeProgress.difficulty !== ProblemDifficulty.G5H) {

            problemTypeProgress.currentDifficultyPoints = 0;
            problemTypeProgress.totalPoints++;
            problemTypeProgress.difficulty = getNextProblemDifficulty(problemTypeProgress.difficulty);
        } else {
            problemTypeProgress.currentDifficultyPoints++;
            problemTypeProgress.totalPoints++;
        }
    } else {
        // if user has lost all their points in the current difficulty and has not reached the lowest
        // difficulty, kick them down to the previous difficulty
        if (problemTypeProgress.currentDifficultyPoints === 0
            && problemTypeProgress.difficulty !== ProblemDifficulty.G1E) {

            problemTypeProgress.currentDifficultyPoints = PointsThresholdPerDifficulty;
            problemTypeProgress.totalPoints--;
            problemTypeProgress.difficulty = getPreviousProblemDifficulty(problemTypeProgress.difficulty);
        } else {
            problemTypeProgress.currentDifficultyPoints--;
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
function createProblemTypeProgression(isSuccess: boolean): IProblemTypeProgress {
    if (isSuccess) {
        const newProblemTypeProgress = <IProblemTypeProgress> {
            difficulty: ProblemDifficulty.G1E,
            currentDifficultyPoints: 1,
            totalPoints: 1
        };
        return newProblemTypeProgress;
    } else {
        const newProblemTypeProgress = <IProblemTypeProgress> {
            difficulty: ProblemDifficulty.G1E,
            currentDifficultyPoints: 0,
            totalPoints: 0
        };
        return newProblemTypeProgress;
    }
}

// Could not figure out if it's possible to create sequential enums
function getNextProblemDifficulty(difficulty:ProblemDifficulty):ProblemDifficulty {
    switch(difficulty) {
        case ProblemDifficulty.G1E: return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M: return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E: return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M: return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E: return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M: return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E: return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M: return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E: return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M: return ProblemDifficulty.G5H;
        case ProblemDifficulty.G5H: return ProblemDifficulty.G5H;
    }
}

function getPreviousProblemDifficulty(difficulty:ProblemDifficulty):ProblemDifficulty {
    switch(difficulty) {
        case ProblemDifficulty.G5H: return ProblemDifficulty.G5M;
        case ProblemDifficulty.G5M: return ProblemDifficulty.G4H5E;
        case ProblemDifficulty.G4H5E: return ProblemDifficulty.G4M;
        case ProblemDifficulty.G4M: return ProblemDifficulty.G3H4E;
        case ProblemDifficulty.G3H4E: return ProblemDifficulty.G3M;
        case ProblemDifficulty.G3M: return ProblemDifficulty.G2H3E;
        case ProblemDifficulty.G2H3E: return ProblemDifficulty.G2M;
        case ProblemDifficulty.G2M: return ProblemDifficulty.G1H2E;
        case ProblemDifficulty.G1H2E: return ProblemDifficulty.G1M;
        case ProblemDifficulty.G1M: return ProblemDifficulty.G1E;
        case ProblemDifficulty.G1E: return ProblemDifficulty.G1E;
    }
}