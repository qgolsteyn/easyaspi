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
    multiplesOf: number,
) => {
    let incorrectSolutions = [];

    if (solution === 0) {
        incorrectSolutions.push('1', '2', '3');
    } else {
        // rounded up value of 10%
        let diff = Math.ceil(solution * 0.1);

        if (multiplesOf > 1) {
            while (diff % multiplesOf !== 0) {
                diff++;
            }
        }

        // pretty simple incorrect solutions just take ~10% differences
        if (solution - diff < 1) {
            incorrectSolutions.push(
                String(solution + diff),
                String(solution + 2 * diff),
                String(solution + 3 * diff),
            );
        } else {
            incorrectSolutions.push(
                String(solution - diff),
                String(solution + diff),
                String(solution + 2 * diff),
            );
        }
    }
    return incorrectSolutions;
};
