import {
    faCalculator,
    faCog,
    faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import _ from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledButton } from '@client/components/Button';
import { StyledCard } from '@client/components/Card';
import { StyledInput } from '@client/components/Input';
import { colors } from '@client/constants/colors';
import {
    classroomName,
    classroomPasscode,
    url,
} from '@client/constants/validations';
import { actions, selectors } from '@client/store';

import bg1 from '../../../../assets/bg1.png';
import { ProblemTypeItem } from './ProblemTypeItem';

validate.validators.presence.options = { message: "can't be empty." };
const constraints = {
    name: classroomName,
    onlineResources: url,
    passcode: classroomPasscode,
};

const TROPHY_SIZE = 32;

enum ClassroomSize {
    XSMALL = 5,
    SMALL = 10,
    MEDIUM = 20,
    LARGE = 30,
}

export const DailyProblemSet = () => {
    const dispatch = useDispatch();

    const loading = useSelector(selectors.teacher.isLoading);
    const classroomInfo = useSelector(selectors.teacher.getClassroomInfo);

    const [state, setState] = React.useState({
        errors: {
            name: undefined,
            onlineResources: undefined,
            passcode: undefined,
        },
        values: {
            name: classroomInfo.name,
            numDailyProblems: classroomInfo.numDailyProblems,
            onlineResources: classroomInfo.onlineResources,
            passcode: classroomInfo.passcode,
            problemsForToday: _.keyBy(
                classroomInfo.problemsForToday,
                o => o,
            ) as { [key: string]: string | undefined },
        },
    });

    const onValue = (key: 'name' | 'passcode' | 'onlineResources') => (
        val: string,
    ) => {
        setState({
            ...state,
            errors: { ...state.errors, [key]: undefined },
            values: { ...state.values, [key]: val },
        });
    };

    const onSubmit = () => {
        const errors = validate(state.values, constraints);
        if (errors) {
            setState({ ...state, errors });
        } else {
            dispatch(
                actions.teacher.update({
                    ...classroomInfo,
                    ...state.values,
                    problemsForToday: Object.keys(
                        state.values.problemsForToday,
                    ).filter(
                        key => state.values.problemsForToday[key] !== undefined,
                    ),
                }),
            );
        }
    };

    const NumberButton = (props: { value: number }) => (
        <StyledButton
            text={props.value}
            styles={styles.button}
            styleAttr={
                state.values.numDailyProblems === props.value
                    ? 'primary'
                    : 'secondary'
            }
            onPress={() =>
                setState({
                    ...state,
                    values: { ...state.values, numDailyProblems: props.value },
                })
            }
        />
    );

    const dailyProblemActive = (name: string) =>
        state.values.problemsForToday[name] !== undefined;

    const dailyProblemSwitch = (name: string) => {
        const active = state.values.problemsForToday[name] !== undefined;
        setState({
            ...state,
            values: {
                ...state.values,
                problemsForToday: {
                    ...state.values.problemsForToday,
                    [name]: active ? undefined : name,
                },
            },
        });
    };

    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Classroom Settings" />
                <StyledCard style={styles.studentList}>
                    <ScrollView>
                        <View style={styles.icon}>
                            <FontAwesomeIcon
                                icon={faCog}
                                size={TROPHY_SIZE}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.title}>Classroom name</Text>
                        <StyledInput
                            textContentType="name"
                            onChangeText={onValue('name')}
                            error={state.errors.name}
                        >
                            {state.values.name}
                        </StyledInput>
                        <Text style={styles.title}>Classroom passcode</Text>
                        <StyledInput
                            keyboardType="number-pad"
                            onChangeText={onValue('passcode')}
                            error={state.errors.passcode}
                        >
                            {state.values.passcode}
                        </StyledInput>
                        <View style={{ ...styles.icon, marginTop: 16 }}>
                            <FontAwesomeIcon
                                icon={faCalculator}
                                size={TROPHY_SIZE}
                                color={colors.success}
                            />
                        </View>
                        <Text style={styles.title}>
                            Number of problems per day
                        </Text>
                        <View style={styles.buttonRow}>
                            <NumberButton value={ClassroomSize.XSMALL} />
                            <NumberButton value={ClassroomSize.SMALL} />
                            <NumberButton value={ClassroomSize.MEDIUM} />
                            <NumberButton value={ClassroomSize.LARGE} />
                        </View>
                        <Text style={styles.title}>Active problem types</Text>
                        <ProblemTypeItem
                            name="addition"
                            active={dailyProblemActive('addition')}
                            onPress={() => dailyProblemSwitch('addition')}
                        />
                        <ProblemTypeItem
                            name="subtraction"
                            active={dailyProblemActive('subtraction')}
                            onPress={() => dailyProblemSwitch('subtraction')}
                        />
                        <ProblemTypeItem
                            name="multiplication"
                            active={dailyProblemActive('multiplication')}
                            onPress={() => dailyProblemSwitch('multiplication')}
                        />
                        <ProblemTypeItem
                            name="division"
                            active={dailyProblemActive('division')}
                            onPress={() => dailyProblemSwitch('division')}
                        />
                        <ProblemTypeItem
                            name="area"
                            active={dailyProblemActive('area')}
                            onPress={() => dailyProblemSwitch('area')}
                        />
                        <View style={{ ...styles.icon, marginTop: 16 }}>
                            <FontAwesomeIcon
                                icon={faQuestion}
                                size={TROPHY_SIZE}
                                color={colors.inputs}
                            />
                        </View>
                        <Text style={styles.title}>Additional help URL</Text>
                        <StyledInput
                            autoCompleteType="off"
                            autoCapitalize="none"
                            keyboardType="url"
                            textContentType="URL"
                            onChangeText={onValue('onlineResources')}
                            error={state.errors.onlineResources}
                        >
                            {state.values.onlineResources}
                        </StyledInput>
                    </ScrollView>
                </StyledCard>
                <StyledButton
                    text="Save"
                    onPress={onSubmit}
                    loading={loading}
                />
                <StyledButton
                    text="Logout"
                    onPress={() => dispatch(actions.teacher.reset())}
                    loading={loading}
                    styleAttr="primary"
                />
            </View>
        </Background>
    );
};

DailyProblemSet.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 8,
        width: '100%',
    },
    icon: {
        alignItems: 'center',
        display: 'flex',
        height: 64,
        justifyContent: 'center',
        marginBottom: 16,
        width: '100%',
    },
    studentList: {
        flex: 1,
        marginBottom: 8,
    },
    title: {
        color: '#333',
        fontFamily: 'josefin-sans-bold',
        fontSize: 18,
        marginBottom: 8,
    },
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 16,
        width: '100%',
    },
});
