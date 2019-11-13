import * as mongoose from 'mongoose';
import { ProblemType, ProblemDifficulty } from '@shared/models/problem';

/**
 * difficulty - current difficulty student is on for this problem type
 * currentDifficultyPoints - points for this difficulty level (increment when 
 * student gets problem right, decrement when student gets problem wrong). Gets
 * reset to 0 when student gets to 9 points (starting at 0) and difficulty gets increased.
 * If student goes down a difficulty tier (when they go below 0 currentDifficultyPoints), 
 * this gets set to 9
 * currentDifficultyAttempts - attempts for this current difficulty level, gets reset to 0 
 * when student changes difficulty level
 * totalPoints - same as currentDifficultyPoints but never gets reset
 */
export interface IProblemTypeProgress extends mongoose.Types.Subdocument {
    difficulty: ProblemDifficulty,
    currentDifficultyPoints: number,
    currentDifficultyAttempts: number,
    totalPoints: number
}

export const ProblemTypeSchema = new mongoose.Schema({
    difficulty: {
        type: ProblemDifficulty,
        required: true
    },
    currentDifficultyPoints: {
        type: Number,
        required: true
    },
    currentDifficultyAttempts: {
        type: Number,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    }
});

export interface IMastery extends mongoose.Document {
    studentId: string;
    progress: Map<ProblemType, IProblemTypeProgress>;
}

export const MasterySchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    progress: {
        type: Map,
        of: ProblemTypeSchema,
        required: true,
    },
});

export const MasteryModel = mongoose.model<IMastery>('masteries', MasterySchema);