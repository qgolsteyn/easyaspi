import { TestScope } from 'cavy';
import { Store } from 'redux';

import { apiMockSetup, loginStudent } from './api';

export const mathSpec = (store: Store) => (spec: TestScope) => {
    spec.describe('Math problems', () => {
        spec.beforeEach(async () => {
            const mock = apiMockSetup();
            loginStudent(mock);
            store.dispatch({ type: 'reset' });
        });

        spec.it('correctly handles a correct answer', async () => {
            await spec.press('Welcome.SignIn');
            await spec.press('StudentHomeScreen.DailyProblem');

            await spec.press('MathProblem.Correct');

            await spec.exists('MathProblem.CorrectIcon');
            await spec.pause(1000);
        });

        spec.it('correctly handles an incorrect answer', async () => {
            await spec.press('Welcome.SignIn');
            await spec.press('StudentHomeScreen.DailyProblem');

            await spec.press('MathProblem.Incorrect');

            await spec.exists('MathProblem.IncorrectIcon');
            await spec.pause(1000);
            await spec.press('MathSolution.NextProblem');
        });

        spec.it('allows switching between solution and problem', async () => {
            await spec.press('Welcome.SignIn');
            await spec.press('StudentHomeScreen.DailyProblem');

            await spec.press('MathProblem.Correct');

            await spec.pause(1000);

            await spec.exists('MathSolution.Solution');
            await spec.press('MathSolution.SwitchView');
            await spec.exists('MathSolution.Problem');
            await spec.press('MathSolution.NextProblem');
        });

        spec.it(
            'shows a done screen when the problem set is complete',
            async () => {
                await spec.press('Welcome.SignIn');
                await spec.press('StudentHomeScreen.DailyProblem');

                for (let i = 0; i < 10; i++) {
                    await spec.press('MathProblem.Correct');

                    await spec.exists('MathProblem.CorrectIcon');
                    await spec.pause(1000);

                    await spec.press('MathSolution.NextProblem');
                }

                await spec.press('MathDone.Back');

                await spec.exists('StudentHomeScreen.Header');
            },
        );
    });
};
