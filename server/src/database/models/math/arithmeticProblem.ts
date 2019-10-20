export class ArithmeticProblem {
    _operands: Array<Number>;
    _operators: Array<String>;
    _solution: Array<String>;

    constructor() {
        this._operands = new Array<Number>();
        this._operators = new Array<String>();
        this._solution = new Array<String>();
    }

    get operands(): Array<Number> {
        return this._operands;
    }

    set operands(operands: Array<Number>) {
        this._operands = operands;
    }

    get operators(): Array<String> {
        return this._operators;
    }

    set operators(operators: Array<String>) {
        this._operators = operators;
    }

    get solution(): Array<String> {
        return this._solution;
    }

    set solution(solution: Array<String>) {
        this._solution = solution;
    }
}