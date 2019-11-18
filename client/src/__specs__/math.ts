import { TestScope } from 'cavy';
import { Store } from 'redux';

import { apiMockSetup, loginStudent } from './api';

const ONE_SECOND = 1000;
const PROBLEMS_PER_SET = 10;

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
            await spec.pause(ONE_SECOND);
        });

        spec.it('correctly handles an incorrect answer', async () => {
            await spec.press('Welcome.SignIn');
            await spec.press('StudentHomeScreen.DailyProblem');

            await spec.press('MathProblem.Incorrect');

            await spec.exists('MathProblem.IncorrectIcon');
            await spec.pause(ONE_SECOND);
            await spec.press('MathSolution.NextProblem');
        });

        spec.it('allows switching between solution and problem', async () => {
            await spec.press('Welcome.SignIn');
            await spec.press('StudentHomeScreen.DailyProblem');

            await spec.press('MathProblem.Correct');

            await spec.pause(ONE_SECOND);

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

                for (let i = 0; i < PROBLEMS_PER_SET; i++) {
                    await spec.press('MathProblem.Correct');

                    await spec.exists('MathProblem.CorrectIcon');
                    await spec.pause(ONE_SECOND);

                    await spec.press('MathSolution.NextProblem');
                }

                await spec.press('MathDone.Back');

                await spec.exists('StudentHomeScreen.Header');
            },
        );
    });
};
