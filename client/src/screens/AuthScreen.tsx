import React from "react";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import * as firebase from "firebase";

//Removed firebase config details for privacy reasons
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

interface IAuthScreenProps {
    navigation: any;
}

export class AuthScreen extends React.Component{

 constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

 SignUp = (email, password) => {
    try {
      props.navigation.navigate('Welcome');
      //firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
  };


  SignIn = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(user => {
         alert(user.uid);
      })
} catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Form>
            <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            full
            rounded
            style={{ marginTop: 20 }}
            onPress={() => this.SignIn(this.state.email, this.state.password)}
          >
            <Text>SignIn</Text>
          </Button>
          <Button
            full
            rounded
            success
            style={{ marginTop: 20 }}
            onPress={() => this.SignUp(this.state.email, this.state.password)}
          >
            <Text>Signup</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});