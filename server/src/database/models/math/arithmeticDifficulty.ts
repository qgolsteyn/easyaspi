export interface IArithmeticDifficulty {
    operands: Array<Array<number>>;
    optExtraOperands: number;
    multiplesOf: number;
}

export class ArithmeticDifficulty implements IArithmeticDifficulty {
    operands!: Array<Array<number>>;
    optExtraOperands!: number;
    multiplesOf!: number;

    ArithmeticDifficulty() {
        this.operands = new Array<Array<number>>();
        this.optExtraOperands = 0;
        this.multiplesOf = 1;
    }
}