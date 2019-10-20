import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON, jsonArrayMember } from 'typedjson';

export interface IMastery {
    problemType: string;
    difficulty: string;
    index: number;
    currentDifficultyPoints: number;
    totalPoints: number;
}

@jsonObject
export class Mastery {
    @jsonMember
    public problemType: string;

    @jsonMember
    difficulty: string;

    @jsonMember
    index: number;

    @jsonMember
    currentDifficultyPoints: number;

    @jsonMember
    totalPoints: number;

    constructor(
        problemType?: string,
        difficulty?: string,
        index?: number,
        currentDifficultyPoints?: number,
        totalPoints?: number
    ) {
        this.problemType = problemType || '';
        this.difficulty = difficulty || '';
        this.index = index || 0;
        this.currentDifficultyPoints = currentDifficultyPoints || 0;
        this.totalPoints = totalPoints || 0;
    }
}

export const masterySerializer = new TypedJSON(Mastery);
