import { demoActions, demoReducer, demoSelectors } from '.';

describe('demo store', () => {
    describe('actions', () => {
        it('should create an action to change demo text', () => {
            const problem = 'test problem';
            const solution = 'test solution';
            const expectedAction = {
                type: 'demo_SET_PROBLEM',
                payload: {
                    problem,
                    solution,
                },
            };
            expect(demoActions.setProblem(problem, solution)).toEqual(
                expectedAction
            );
        });
    });

    describe('reducer', () => {
        it('should return the initial state', () => {
            expect(demoReducer(undefined, {} as any)).toEqual(
                expect.objectContaining({
                    problem: expect.any(String),
                    solution: expect.any(String),
                })
            );
        });
        it('should handle demo_SET_PROBLEM', () => {
            expect(
                demoReducer(
                    undefined,
                    demoActions.setProblem('test', 'solution')
                )
            ).toMatchObject({
                problem: 'test',
                solution: 'solution',
            });
        });
    });

    describe('selectors', () => {
        it('should return problem', () => {
            const state = {
                demo: {
                    problem: 'test',
                    solution: 'solution',
                },
            };

            expect(demoSelectors.getProblem(state)).toEqual('test');
        });

        it('should return solution', () => {
            const state = {
                demo: {
                    problem: 'test',
                    solution: 'solution',
                },
            };

            expect(demoSelectors.getSolution(state)).toEqual('solution');
        });
    });
});
