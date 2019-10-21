import * as mongoose from 'mongoose';

import { ProblemArchetype, ProblemType } from 'shared';
import { IArithmeticDifficulty } from './arithmeticDifficulty';

export interface IProblemTemplate {
    problemArchetype: ProblemArchetype;
    problemType: ProblemType;
    operators: string[];
    difficultyMap: Map<string, IArithmeticDifficulty>; 
}

export class ProblemTemplate implements IProblemTemplate {
    problemArchetype!: ProblemArchetype;
    problemType!: ProblemType;
    operators!: string[];
    difficultyMap!: Map<string, IArithmeticDifficulty>; 

    ProblemTemplate() {
        this.problemArchetype = ProblemArchetype.UNKNOWN;
        this.problemType = ProblemType.UNKNOWN;
        this.operators = new Array<string>();
        this.difficultyMap = new Map<string, IArithmeticDifficulty>(); 
    }
}

export type IProblemTemplateSchema = IProblemTemplate & mongoose.Document;

const ProblemTemplateSchema = new mongoose.Schema({
    problemArchetype: {
        type: String,
        required: true,
    },
    problemType: {
        type: String,
        required: true,
    },
    operators: {
        type: Array,
        required: true,
    },
    difficultyMap: {
        type: Map,
        required: true,
    },
});

// TODO: by default mongoose only looks for lowercase collection names,
// there is a way to change this but its not a priority
export const ProblemTemplateModel = mongoose.model<IProblemTemplateSchema>(
    'problemtemplate',
    ProblemTemplateSchema
);
