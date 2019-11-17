import { Tester, TestHookStore } from 'cavy';
import Constants from 'expo-constants';
import * as React from 'react';

const { manifest } = Constants;

import ExampleSpec from './__specs__/register';

const testHookStore = new TestHookStore();

interface ITestHarnessProps {
    children: React.ReactElement;
}

export const TestHarness = (props: ITestHarnessProps) => {
    const isTest = manifest.name && manifest.name.endsWith('test');
    return isTest ? (
        <Tester specs={[ExampleSpec]} store={testHookStore}>
            {props.children}
        </Tester>
    ) : (
        props.children
    );
};
