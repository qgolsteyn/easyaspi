export class ArithmeticDifficulty {
    _operands: Array<String>;
    _optExtraOperands: Number;
    _multiplesOf: Number;

    constructor() {
        this._operands = new Array<String>();
        this._optExtraOperands = 0;
        this._multiplesOf = 1;
    }

    get operands(): Array<String> {
        return this._operands;
    }

    set operands(operands: Array<String>) {
        this._operands = operands;
    }

    get optExtraOperands(): Number {
        return this._optExtraOperands;
    }

    set optExtraOperands(optExtraOperands: Number) {
        this._optExtraOperands = optExtraOperands;
    }

    get multiplesOf(): Number {
        return this._multiplesOf;
    }

    set multiplesOf(multiplesOf: Number) {
        this._multiplesOf = multiplesOf;
    }
}