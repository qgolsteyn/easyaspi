import { demoActions, demoReducer } from '.';

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
            expect(demoReducer(undefined, {} as any)).toEqual({
                demoText: 'Press here',
            });
        });
        it('should handle demo_CHANGE_TEXT', () => {
            expect(
                demoReducer(undefined, demoActions.changeDemoText('test'))
            ).toEqual({
                demoText: 'test',
            });
        });
    });
});
