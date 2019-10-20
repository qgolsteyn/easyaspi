import { generateNumbers, computeAssignments } from './generateNumbers';

describe('generateNumbers', () => {
    it('should handle an empty definition', () => {
        const result = generateNumbers({}, 'testSeed');
        expect(result).toEqual({});
    });

    it('should return values within the specified range', () => {
        const result = generateNumbers(
            {
                a: {
                    min: 12,
                    max: 17,
                },
                b: {
                    min: 12,
                    max: 12,
                },
            },
            'testSeed'
        );

        expect(result['a']).toBeGreaterThanOrEqual(12);
        expect(result['a']).toBeLessThanOrEqual(17);
        expect(result['b']).toEqual(12);
    });

    it('should throw when the range is invalid', () => {
        expect(() => {
            generateNumbers({
                a: {
                    min: 12,
                    max: 10,
                },
            });
        }).toThrow();
    });

    it('should return the same value with the same seed', () => {
        const result = generateNumbers(
            {
                a: {
                    min: 2,
                    max: 5,
                },
                b: {
                    min: 6,
                    max: 9,
                },
            },
            'testSeed'
        );

        expect(result).toMatchInlineSnapshot(`
            Object {
              "a": 4,
              "b": 6,
            }
        `);
    });
});

describe('computeAssignments', () => {
    it('should handle empty definition', () => {
        const result = computeAssignments({}, {});
        expect(result).toEqual({});
    });

    it('should correct perform basic arithmetic', () => {
        const scope = {
            x: 4,
            y: 2,
        };

        const result = computeAssignments(
            {
                a: 'x + y',
                b: 'x - y',
                c: 'x * y',
                d: 'x / y',
            },
            scope
        );

        expect(result['a']).toEqual(scope.x + scope.y);
        expect(result['b']).toEqual(scope.x - scope.y);
        expect(result['c']).toEqual(scope.x * scope.y);
        expect(result['d']).toEqual(scope.x / scope.y);
    });

    it('should throw when a variable in scope is missing', () => {
        expect(() =>
            computeAssignments(
                {
                    a: 'x + y',
                },
                {
                    x: 4,
                }
            )
        ).toThrow();
    });

    it('should throw when an assignment is not a valid math expression', () => {
        expect(() => {
            computeAssignments(
                {
                    a: 'x +',
                },
                {
                    x: 4,
                }
            );
        }).toThrow();
    });
});
