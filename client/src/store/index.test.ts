import { createStore } from '.';

describe('create store', () => {
    it('should have the correct state shape', () => {
        const store = createStore();
        const state = store.getState();

        expect(state).toEqual(
            expect.objectContaining({
                demo: expect.any(Object),
            })
        );
    });
});
