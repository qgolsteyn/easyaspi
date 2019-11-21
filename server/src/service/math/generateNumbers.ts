const INCORRECT_SOLUTIONS_VARIANCE = 0.1;

export const generateNumber = (
    min: number,
    max: number,
    multiplesOf?: number,
) => {
    let value = Math.round(min + (max - min) * Math.random());

    if (multiplesOf && multiplesOf > 1) {
        while (value % multiplesOf !== 0) {
            value++;
        }
    }

    return value;
};

export const generateIncorrectWholeNumberSolutions = (
    solution: number,
    multiplesOf?: number,
) => {
    const incorrectSolutions = [];

    if (solution === 0) {
        incorrectSolutions.push('1', '2', '3');
    } else {
        // rounded up value of 10%
        let diff = Math.ceil(solution * INCORRECT_SOLUTIONS_VARIANCE);

        if (multiplesOf && multiplesOf > 1) {
            while (diff % multiplesOf !== 0) {
                diff++;
            }
        }

        const two = 2;
        const three = 3;

        // pretty simple incorrect solutions just take ~10% differences
        if (solution - diff < 1) {
            incorrectSolutions.push(
                String(solution + diff),
                String(solution + two * diff),
                String(solution + three * diff),
            );
        } else {
            incorrectSolutions.push(
                String(solution - diff),
                String(solution + diff),
                String(solution + two * diff),
            );
        }
    }
    return incorrectSolutions;
};

export const generateIncorrectWholeNumberSolutionsWithRemainder = (
    divisor: number,
    solution: number,
    multiplesOf?: number,
) => {
    const incorrectSolutions = generateIncorrectWholeNumberSolutions(
        solution,
        multiplesOf,
    );

    for (let i = 0; i < incorrectSolutions.length; i++) {
        const incorrectRemainder = generateNumber(0, divisor);
        incorrectSolutions[i] = incorrectSolutions[i].concat(
            ' R' + incorrectRemainder,
        );
    }
    return incorrectSolutions;
};
