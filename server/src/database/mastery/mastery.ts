import * as mongoose from 'mongoose';
import { ProblemDifficulty, ProblemType } from '../../../../client/src/shared/models/problem';

/**
 * currentDifficultyAttempts - attempts for this current difficulty level, gets reset to 0
 * when student changes difficulty level
 *
 * currentDifficultyPoints - points for this difficulty level (increment when
 * student gets problem right, decrement when student gets problem wrong). Gets
 * reset to 0 when student gets to 9 points (starting at 0) and difficulty gets increased.
 * If student goes down a difficulty tier (when they go below 0 currentDifficultyPoints),
 * this gets set to 9
 *
 * difficulty - current difficulty student is on for this problem type
 *
 * totalPoints - same as currentDifficultyPoints but never gets reset
 */
export interface IProblemTypeProgress extends mongoose.Types.Subdocument {
    currentDifficultyAttempts: number;
    currentDifficultyPoints: number;
    difficulty: ProblemDifficulty;
    totalPoints: number;
}

export const ProblemTypeProgressSchema = new mongoose.Schema({
    currentDifficultyAttempts: {
        required: true,
        type: Number,
    },
    currentDifficultyPoints: {
        required: true,
        type: Number,
    },
    difficulty: {
        required: true,
        type: ProblemDifficulty,
    },
    totalPoints: {
        required: true,
        type: Number,
    },
});

export interface IMastery extends mongoose.Document {
    progress: Map<ProblemType, IProblemTypeProgress>;
    studentId: string;
}

export const MasterySchema = new mongoose.Schema({
    progress: {
        of: ProblemTypeProgressSchema,
        required: true,
        type: Map,
    },
    studentId: {
        required: true,
        type: String,
    },
});

export const MasteryModel = mongoose.model<IMastery>(
    'masteries',
    MasterySchema,
);
