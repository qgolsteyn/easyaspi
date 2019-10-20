export interface IArithmeticProblem {
    operands: Array<number>;
    operators: Array<string>;
    solution: Array<string>;
}

export class ArithmeticProblem implements IArithmeticProblem {
    operands!: Array<number>;
    operators!: Array<string>;
    solution!: Array<string>;

    ArithmeticProblem() {
        this.operands = new Array<number>();
        this.operators = Array<string>();
        this.solution = Array<string>();
    }    
}