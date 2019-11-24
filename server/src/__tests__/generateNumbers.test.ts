import {
    generateIncorrectWholeNumberSolutions,
    generateNumber,
} from '../service/math/generateNumbers';

const THREE = 3;

test('Check if generateNumber returns random value between upper and lower bounds', async () => {
    const lower = 0;
    const upper = 2;

    const value = generateNumber(lower, upper);

    expect(value).toBeLessThanOrEqual(upper);
    expect(value).toBeGreaterThanOrEqual(lower);
});

test('Check if generateNumber returns random value adhering to specified multiplesOf', async () => {
    const lower = 0;
    const upper = 100;
    const multiplesOf = 5;

    const value = generateNumber(lower, upper, multiplesOf);

    expect(value % multiplesOf).toBe(0);
});

test('Check if generateIncorrectWholeNumberSolutions generates 3 values distinct from solution', async () => {
    const solution = 100;
    const multiplesOf = 1;

    const values = generateIncorrectWholeNumberSolutions(solution, multiplesOf);

    expect(values.length).toBe(THREE);

    for (let i = 0; i < values.length; i++) {
        expect(values[i]).not.toBe(String(solution));
        expect(parseInt(values[i])).toBeGreaterThanOrEqual(0);
    }
});

test('Check if generateIncorrectWholeNumberSolutions generates values that adhere to multiplesOf', () => {
    const solution = 100;
    const multiplesOf = 5;

    const values = generateIncorrectWholeNumberSolutions(solution, multiplesOf);

    expect(values.length).toBe(THREE);

    for (let i = 0; i < values.length; i++) {
        expect(values[i]).not.toBe(String(solution));
        expect(parseInt(values[i])).toBeGreaterThanOrEqual(0);
        expect(parseInt(values[i]) % 5).toBe(0);
    }
});

test('Check if generateIncorrectWholeNumberSolutions generates 1, 2, 3 if solution is 0', () => {
    const multiplesOf = 1;

    const values = generateIncorrectWholeNumberSolutions(0, multiplesOf);

    expect(values.length).toBe(THREE);
    expect(values).toContain('1');
    expect(values).toContain('2');
    expect(values).toContain('3');
});

test('Check if generateIncorrectWholeNumberSolutions generates non negative values', () => {
    const solution = 1;
    const multiplesOf = 1;

    const values = generateIncorrectWholeNumberSolutions(solution, multiplesOf);

    expect(values.length).toBe(THREE);

    for (let i = 0; i < values.length; i++) {
        expect(values[i]).not.toBe(String(solution));
        expect(parseInt(values[i])).toBeGreaterThanOrEqual(0);
    }
});
