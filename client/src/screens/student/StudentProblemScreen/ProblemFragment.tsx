import {
    faCheckCircle,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCavy } from 'cavy';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { colors } from '@client/constants/colors';
import { actions } from '@client/store';
import { IProblem } from '@client/store/reducers/problems';

enum CURRENT_STATE {
    SHOW_PROBLEM,
    CORRECT_ANSWER,
    WRONG_ANSWER,
}

const ICON_SIZE = 128;
const RESULT_DELAY = 1000;

interface IProblemFragmentProps {
    currentProblemNumber: number;
    currentProblem: IProblem;
}

export const ProblemFragment = (props: IProblemFragmentProps) => {
    const [currentState, setState] = React.useState(CURRENT_STATE.SHOW_PROBLEM);

    const dispatch = useDispatch();
    const testHook = useCavy();

    const setCorrect = () => {
        if (currentState === CURRENT_STATE.SHOW_PROBLEM) {
            setState(CURRENT_STATE.CORRECT_ANSWER);
            setTimeout(
                () => dispatch(actions.problems.solveCurrentProblem(true)),
                RESULT_DELAY,
            );
        }
    };

    const setIncorrect = () => {
        if (currentState === CURRENT_STATE.SHOW_PROBLEM) {
            setState(CURRENT_STATE.WRONG_ANSWER);
            setTimeout(
                () => dispatch(actions.problems.solveCurrentProblem(false)),
                RESULT_DELAY,
            );
        }
    };

    const CorrectButton = (
        <StyledButton
            text=""
            styleAttr={
                currentState === CURRENT_STATE.SHOW_PROBLEM
                    ? 'primary'
                    : 'success'
            }
            onPress={setCorrect}
            ref={testHook('MathProblem.Correct')}
        />
    );

    const IncorrectButton = (
        <StyledButton
            text=""
            styleAttr={
                currentState === CURRENT_STATE.SHOW_PROBLEM
                    ? 'primary'
                    : 'error'
            }
            onPress={setIncorrect}
            ref={testHook('MathProblem.Incorrect')}
        />
    );

    const buttons = props.currentProblem.answers.map((answer, index) =>
        answer === props.currentProblem.solution
            ? React.cloneElement(CorrectButton, {
                  key: answer,
                  styles:
                      index % 2 === 0
                          ? { ...styles.button, marginRight: 8 }
                          : { ...styles.button, marginLeft: 8 },
                  text: answer,
              })
            : React.cloneElement(IncorrectButton, {
                  key: answer,
                  styles:
                      index % 2 === 0
                          ? { ...styles.button, marginRight: 8 }
                          : { ...styles.button, marginLeft: 8 },
                  text: answer,
              }),
    );

    let CardContent = null;
    switch (currentState) {
        case CURRENT_STATE.SHOW_PROBLEM:
            CardContent = (
                <Text style={styles.problemText}>
                    {props.currentProblem.problem}
                </Text>
            );
            break;
        case CURRENT_STATE.CORRECT_ANSWER:
            CardContent = (
                <View ref={testHook('MathProblem.CorrectIcon')}>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        size={ICON_SIZE}
                        color={colors.success}
                    />
                </View>
            );
            break;
        case CURRENT_STATE.WRONG_ANSWER:
            CardContent = (
                <View ref={testHook('MathProblem.IncorrectIcon')}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        size={ICON_SIZE}
                        color={colors.error}
                    />
                </View>
            );
            break;
    }

    return (
        <>
            <StyledCard
                title={`Question ${props.currentProblemNumber}`}
                style={styles.problemCard}
            >
                <View style={styles.cardContent}>{CardContent}</View>
            </StyledCard>
            <View style={{ ...styles.buttonRow, marginBottom: 8 }}>
                {buttons.slice(0, 2)}
            </View>
            <View style={styles.buttonRow}>{buttons.slice(2)}</View>
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
        fontFamily: 'josefin-sans-bold',
        fontSize: 64,
    },
});
