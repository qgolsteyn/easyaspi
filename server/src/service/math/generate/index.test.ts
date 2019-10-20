import { generateProblemValues } from '.';

describe('generateProblemValues', () => {
    it('should handle an empty definition', () => {
        const result = generateProblemValues(
            {
                controlledVariables: {},
            },
            'testSeed'
        );

        expect(result).toEqual({});
    });

    it('should generate controlled variables in the correct range', () => {
        const result = generateProblemValues(
            {
                controlledVariables: {
                    a: {
                        min: 12,
                        max: 17,
                    },
                    b: {
                        min: 12,
                        max: 12,
                    },
                },
            },
            'testSeed'
        );

        expect(result['a']).toBeGreaterThanOrEqual(12);
        expect(result['a']).toBeLessThanOrEqual(17);
        expect(result['b']).toEqual(12);
    });

    it('should use the controlled variables to determine the derived variables', () => {
        const result = generateProblemValues(
            {
                controlledVariables: {
                    a: {
                        min: 1,
                        max: 5,
                    },
                    b: {
                        min: 5,
                        max: 10,
                    },
                },
                derivedVariables: {
                    x: 'a + b',
                    y: 'b - a',
                },
            },
            'testSeed'
        );

        expect(result['x']).toEqual(result['a'] + result['b']);
        expect(result['y']).toEqual(result['b'] - result['a']);
    });

    it('should return the same values with the same seed', () => {
        const result = generateProblemValues(
            {
                controlledVariables: {
                    a: {
                        min: 1,
                        max: 5,
                    },
                    b: {
                        min: 5,
                        max: 10,
                    },
                },
                derivedVariables: {
                    x: 'a + b',
                    y: 'b - a',
                },
            },
            'testSeed'
        );

        expect(result).toMatchInlineSnapshot(`
            Object {
              "a": 4,
              "b": 5,
              "x": 9,
              "y": 1,
            }
        `);
    });
});
