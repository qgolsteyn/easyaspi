import React, { Component } from 'react';
import { View, Image, StyleSheet} from 'react-native';

export default class StudentProblemScreen extends Component {
  render() {
    return (
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
        <Image
          style={{width: 66, height: 58}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
        />
                <Image
          style={styles.header}
          source={{uri : "https://math.now.sh?from=\frac{1}{\Gamma(s)}\int_{0}^{\infty}\frac{u^{s-1}}{e^{u}-1}\mathrm{d}u.png"}}
        />
      </View>
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
        width: '10%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '50%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    container: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
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