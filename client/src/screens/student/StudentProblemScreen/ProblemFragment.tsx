import * as React from 'react';

import { IProblem } from '@client/store/reducers/problems';

import { ProblemFragment as AreaProblemFragment } from './area/ProblemFragment';
import { ProblemFragment as ArithmeticProblemFragment } from './arithmetic/ProblemFragment';

interface IProblemFragmentProps {
    currentProblem: IProblem;
}

export const ProblemFragment = (props: IProblemFragmentProps) => {
    return props.currentProblem.problemType === 'area' ? (
        <AreaProblemFragment currentProblem={props.currentProblem} />
    ) : (
        <ArithmeticProblemFragment currentProblem={props.currentProblem} />
    );
};
