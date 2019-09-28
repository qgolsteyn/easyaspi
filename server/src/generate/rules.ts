/**
 *
 */

enum Assignment {
    GREATER = '>',
    GREATER_EQUAL = '>=',
    LESS = '<',
    LESS_EQUAL = '<=',
    EQUAL = '=',
    ADDITION = '+',
    SUBSTRACTION = '-',
    MULTIPLICATION = '*',
    DIVISION = '/',
}

interface IMathProblem {
    variables: string[];
    rules: IOperator;
}

interface IOperator {
    lhs: string | number | IOperator;
    rhs: string | number | IOperator;
    equality: Assignment;
}

const rule: IOperator = {
    lhs: 'a',
    equality: Assignment.SUBSTRACTION,
    rhs: {
        lhs: 'b',
        equality: Assignment.MULTIPLICATION,
        rhs: 2,
    },
};

export const ruleScoring = () => {};
