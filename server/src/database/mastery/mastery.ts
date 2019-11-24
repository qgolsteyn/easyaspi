import { ProblemDifficulty, ProblemType } from '@shared/models/problem';
import * as mongoose from 'mongoose';

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
 * totalAttempts - total lifetime math problem attempts irrespective of problem type
 *
 * totalCorrectAnswers - total lifetime math problems answered correctly irrespective of problem type
 */
export interface IProblemTypeProgress extends mongoose.Types.Subdocument {
    currentDifficultyAttempts: number;
    currentDifficultyPoints: number;
    difficulty: ProblemDifficulty;
    totalAttempts: number;
    totalCorrectAnswers: number;
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
    totalAttempts: {
        required: true,
        type: Number,
    },
    totalCorrectAnswers: {
        required: true,
        type: Number,
    },
});

export interface IMastery extends mongoose.Document {
    classroomId: string;
    numDailyAttempts: number;
    numDailyCorrectAnswers: number;
    progress: Map<ProblemType, IProblemTypeProgress>;
    studentId: string;
    totalLifetimeAttempts: number;
    totalLifetimeCorrectAnswers: number;
}
export const MasterySchema = new mongoose.Schema({
    classroomId: {
        required: true,
        type: String,
    },
    numDailyAttempts: {
        required: true,
        type: Number,
    },
    numDailyCorrectAnswers: {
        required: true,
        type: Number,
    },
    progress: {
        of: ProblemTypeProgressSchema,
        required: true,
        type: Map,
    },
    studentId: {
        required: true,
        type: String,
    },
    totalLifetimeAttempts: {
        required: true,
        type: Number,
    },
    totalLifetimeCorrectAnswers: {
        required: true,
        type: Number,
    },
});

export const MasteryModel = mongoose.model<IMastery>(
    'masteries',
    MasterySchema,
);
