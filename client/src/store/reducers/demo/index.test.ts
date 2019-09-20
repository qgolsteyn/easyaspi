import { demoActions, demoReducer, demoSelectors } from '.';

describe('demo store', () => {
    describe('actions', () => {
        it('should create an action to change demo text', () => {
            const text = 'test text';
            const expectedAction = {
                type: 'demo_CHANGE_TEXT',
                payload: {
                    text,
                },
            };
            expect(demoActions.changeDemoText(text)).toEqual(expectedAction);
        });
    });

    describe('reducer', () => {
        it('should return the initial state', () => {
            expect(demoReducer(undefined, {} as any)).toEqual(
                expect.objectContaining({
                    demoText: expect.any(String),
                })
            );
        });
        it('should handle demo_CHANGE_TEXT', () => {
            expect(
                demoReducer(undefined, demoActions.changeDemoText('test'))
            ).toMatchObject({
                demoText: 'test',
            });
        });
    });

    describe('selectors', () => {
        it('should return the demo text', () => {
            const state = {
                demo: {
                    demoText: 'test',
                },
            };

            expect(demoSelectors.getText(state)).toEqual('test');
        });
    });
});
