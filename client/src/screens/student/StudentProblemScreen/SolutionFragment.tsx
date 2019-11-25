import * as React from 'react';

import { IProblem } from '@client/store/reducers/problems';

import { SolutionFragment as AreaSolutionFragment } from './area/SolutionFragment';
import { SolutionFragment as ArithmeticSolutionFragment } from './arithmetic/SolutionFragment';

interface IProblemFragmentProps {
    currentProblem: IProblem;
}

export const SolutionFragment = (props: IProblemFragmentProps) => {
    return props.currentProblem.problemType === 'area' ? (
        <AreaSolutionFragment currentProblem={props.currentProblem} />
    ) : (
        <ArithmeticSolutionFragment currentProblem={props.currentProblem} />
    );
};
