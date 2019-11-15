import 'reflect-metadata';
import { TypedJSON } from 'typedjson';
export interface IMastery {
    problemType: string;
    difficulty: string;
    index: number;
    currentDifficultyPoints: number;
    totalPoints: number;
}
export declare class Mastery {
    problemType: string;
    difficulty: string;
    index: number;
    currentDifficultyPoints: number;
    totalPoints: number;
    constructor(problemType?: string, difficulty?: string, index?: number, currentDifficultyPoints?: number, totalPoints?: number);
}
export declare const masterySerializer: TypedJSON<Mastery>;
