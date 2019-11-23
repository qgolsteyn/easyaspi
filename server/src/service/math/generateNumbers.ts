const INCORRECT_SOLUTIONS_MIN_VARIANCE = 0.05;
const INCORRECT_SOLUTIONS_MAX_VARIANCE = 0.1;

const NUMBER_OF_INCORRECT_SOLUTIONS = 3;
const SAME_LAST_DIGIT_THRESHOLD = 20;

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
    const incorrectSolutions: string[] = [];

    if (solution === 0) {
        incorrectSolutions.push('1', '2', '3');
    } else {
        // generate 3 incorrect solutions but randomize the number that are
        // greater than or less than the solution
        let numValuesGreaterThanSolution = generateNumber(
            0,
            NUMBER_OF_INCORRECT_SOLUTIONS,
        );
        const numValuesLessThanSolution =
            NUMBER_OF_INCORRECT_SOLUTIONS - numValuesGreaterThanSolution;

        // keep track of a count and apply it to the difference to avoid duplicates
        let count = 1;
        for (let i = 0; i < numValuesLessThanSolution; i++) {
            const diff = generateDifference(solution, multiplesOf);

            // if subtracting the difference from the solution results in 0 or
            // negative, ensure an extra incorrect solution greater than solution
            // is generated
            if (solution - count * diff < 1) {
                numValuesGreaterThanSolution++;
            } else {
                incorrectSolutions.push(
                    generateIncorrectValue(
                        diff,
                        incorrectSolutions,
                        solution - count * diff,
                        solution,
                    ),
                );
            }
            count++;
        }

        count = 1;
        for (let i = 0; i < numValuesGreaterThanSolution; i++) {
            // difference from solution to use for incorrect solution
            const diff = generateDifference(solution, multiplesOf);

            // generate the incorrect solution string and push it to the array
            incorrectSolutions.push(
                generateIncorrectValue(
                    diff,
                    incorrectSolutions,
                    solution + count * diff,
                    solution,
                ),
            );
            count++;
        }
    }
    return incorrectSolutions;
};

const generateDifference = (solution: number, multiplesOf?: number) => {
    // find the percentage variance to take from the solution
    const variance =
        Math.random() *
            (INCORRECT_SOLUTIONS_MAX_VARIANCE -
                INCORRECT_SOLUTIONS_MIN_VARIANCE) +
        INCORRECT_SOLUTIONS_MIN_VARIANCE;

    let diff = Math.ceil(solution * variance);

    // make sure variance conforms to the multiplesOf constriction
    if (multiplesOf && multiplesOf > 1) {
        while (diff % multiplesOf !== 0) {
            diff++;
        }
    }

    return diff;
};

const generateIncorrectValue = (
    difference: number,
    incorrectSolutions: string[],
    incorrectValue: number,
    solution: number,
) => {
    // only try to generate incorrect value with same last digit if solution is above 20
    if (incorrectValue > SAME_LAST_DIGIT_THRESHOLD) {
        const incorrectValueString = incorrectValue.toString();

        // try to generate an incorrect solution with the same last digit as solution to make
        // multiple choice harder
        const ten = 10;

        const sameLastDigitIncorrectValueString =
            incorrectValueString.substring(0, incorrectValueString.length - 1) +
            (solution % ten);

        const sameLastDigitIncorrectValue = parseInt(
            sameLastDigitIncorrectValueString,
            ten,
        );

        // if incorrect solution with same last digit equals the solution or already exists
        // within the incorrect solutions array, then it cannot be used
        if (
            sameLastDigitIncorrectValue === solution ||
            incorrectSolutions.includes(sameLastDigitIncorrectValueString)
        ) {
            // cannot allow duplicate values in incorrect solutions array
            while (incorrectSolutions.includes(incorrectValue.toString())) {
                incorrectValue += difference;
            }
            return incorrectValue.toString();
        } else {
            return sameLastDigitIncorrectValueString;
        }
    } else {
        // cannot allow duplicate values in incorrect solutions array
        while (
            solution === incorrectValue ||
            incorrectSolutions.includes(incorrectValue.toString())
        ) {
            incorrectValue += difference;
        }

        return incorrectValue.toString();
    }
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
