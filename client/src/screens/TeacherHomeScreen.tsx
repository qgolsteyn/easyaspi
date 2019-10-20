import React from 'react';
import {  View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import { Background } from '../components/Background';
import { StyledButton } from '../components/Button';
import { StyledHeader } from '../components/Header';
import { StyledCard} from '../components/Card';

import bg2 from '../../assets/bg2.png';
import { colors } from '../constants/colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ title }) {
  constructor(props){
    super(props);
    this.state = {
      name : "jake",
      studentsList : DATA,
    }
  }
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function App() {
  return (

      <Background backgroundImage={bg2} backgroundColor={colors.bg}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <StyledHeader>Let's meet</StyledHeader>
                </View>

                      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />        
            </View>
        </Background>
  );
}


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        paddingTop: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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