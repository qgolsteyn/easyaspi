import { Tester, TestHookStore } from 'cavy';
import Constants from 'expo-constants';
import * as React from 'react';
import { Store } from 'redux';

import { mathSpec } from './__specs__/math';
import { registerSpec } from './__specs__/register';

const { manifest } = Constants;

const testHookStore = new TestHookStore();

interface ITestHarnessProps {
    store: Store;
    children: React.ReactElement;
}

export const TestHarness = (props: ITestHarnessProps) => {
    const isTest = manifest.name && manifest.name.endsWith('test');
    return isTest ? (
        <Tester
            specs={[registerSpec(), mathSpec(props.store)]}
            store={testHookStore}
        >
            {props.children}
        </Tester>
    ) : (
        props.children
    );
};
