import { useCavy } from 'cavy';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { actions } from '@client/store';
import { IProblem } from '@client/store/reducers/problems';

import { MathProblem } from './MathProblem';

interface ISolutionFragmentProps {
    currentProblem: IProblem;
}

export const SolutionFragment = (props: ISolutionFragmentProps) => {
    const dispatch = useDispatch();
    const testHook = useCavy();

    const [showSolution, setShowSolution] = React.useState(true);

    return (
        <>
            {showSolution ? (
                <StyledCard title="The solution is" style={styles.problemCard}>
                    <View
                        style={styles.cardContent}
                        ref={testHook('MathSolution.Solution')}
                    >
                        <NumberFormat
                            value={props.currentProblem.solution.split(' ')[0]}
                            displayType="text"
                            thousandSeparator={true}
                            renderText={value => (
                                <Text style={styles.problemText}>
                                    {value +
                                        props.currentProblem.solution
                                            .split(' ')
                                            .slice(1)
                                            .join(' ')}
                                </Text>
                            )}
                        />
                    </View>
                </StyledCard>
            ) : (
                <StyledCard title="Solve" style={styles.problemCard}>
                    <View
                        style={styles.cardContent}
                        ref={testHook('MathSolution.Problem')}
                    >
                        <MathProblem
                            operands={props.currentProblem.operands}
                            operators={props.currentProblem.operators}
                        />
                    </View>
                </StyledCard>
            )}
            <View style={styles.buttonRow}>
                <StyledButton
                    text={showSolution ? 'See problem' : 'See solution'}
                    onPress={() => setShowSolution(!showSolution)}
                    styles={{
                        ...styles.button,
                        flex: 2,
                        marginRight: 8,
                    }}
                    ref={testHook('MathSolution.SwitchView')}
                />
                <StyledButton
                    text="Next >"
                    onPress={() => {
                        setShowSolution(true);
                        dispatch(actions.problems.goToNextProblem());
                    }}
                    styles={{
                        ...styles.button,
                        marginLeft: 8,
                    }}
                    ref={testHook('MathSolution.NextProblem')}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
    },
    cardContent: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        paddingBottom: 64,
        width: '100%',
    },
    problemCard: {
        flex: 1,
        marginBottom: 16,
        width: '100%',
    },
    problemPrompt: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 32,
        marginBottom: 32,
    },
    problemText: {
        color: '#333',
        fontSize: 64,
    },
});
