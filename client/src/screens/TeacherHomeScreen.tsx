import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { StyledHeader } from '../components/Header';
import { StyledCard } from '../components/Card';

import bg2 from '../../assets/bg2.png';
import { colors } from '../constants/colors';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Student1',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Student2',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Student3',
    },
];

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export class TeacherHomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'jake',
            studentsList: DATA,
        };
    }
    render() {
        return (
            <Background backgroundImage={bg2} backgroundColor={colors.bg}>
                <View style={styles.header}>
                    <StyledHeader>Welcome {this.state.name}</StyledHeader>
                </View>
                <View style={styles.wrapper}>
                    <StyledCard>
                        <FlatList
                            data={this.state.studentsList}
                            renderItem={({ item }) => (
                                <Item title={item.title} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </StyledCard>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '300%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 28,
        paddingHorizontal: 32,
        paddingBottom: 32,
    },
    header: {
        width: '100%',
        height: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    container: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    listStyle: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 3,
        marginVertical: 0,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 15,
    },
});
