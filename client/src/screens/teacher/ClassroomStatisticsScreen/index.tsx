import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryTheme,
} from 'victory-native';

import { Background } from '@client/components/Background';
import { StyledBackHeader } from '@client/components/BackHeader';
import { StyledCard } from '@client/components/Card';
import { colors } from '@client/constants/colors';

import bg1 from '../../../../assets/bg1.png';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
];

export const ClassroomStatistics = () => {
    return (
        <Background backgroundColor={colors.bg} backgroundImage={bg1}>
            <View style={styles.wrapper}>
                <StyledBackHeader title="Classroom stats" />
                <StyledCard style={styles.stats}>
                    <VictoryChart
                        // adding the material theme provided with Victory
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={300}
                        height={400}
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={[
                                'Quarter 1',
                                'Quarter 2',
                                'Quarter 3',
                                'Quarter 4',
                            ]}
                        />
                        <VictoryAxis
                            dependentAxis={true}
                            tickFormat={x => `$${x / 1000}k`}
                        />
                        <VictoryBar data={data} x="quarter" y="earnings" />
                    </VictoryChart>
                </StyledCard>
            </View>
        </Background>
    );
};

ClassroomStatistics.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    stats: {
        flex: 1,
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
