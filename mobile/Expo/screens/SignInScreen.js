import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";


export default class SignInScreen extends React.Component {

  static navigationOptions = {
    title: 'Влезте в своя акаунт',
    headerStyle: {
      backgroundColor: '#4f6beb',
    },
    headerTintColor: '#fff',

  }

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.imageView}>
          <Image
            source={
              require('../assets/images/dzvunicon.png')
            }
            style={styles.image}
          />
        </View>
        <TextInput autoCapitalize='none' secureTextEntry={false} style={styles.box} onChangeText={(text) => this.setState({ email: text })} placeholder='Email' />
        <TextInput autoCapitalize='none' secureTextEntry={true} style={styles.box} onChangeText={(text) => this.setState({ password: text })} placeholder='Парола' />
        <TouchableOpacity style={styles.signInButton} onPress={this._signInAsync}>
          <Text style={styles.signInText}>Вход</Text>
        </TouchableOpacity>
        <FlashMessage position="top" />
      </View>
    );
  }

  _signInAsync = async () => {
    const res = await fetch('https://dzvun-server.cfapps.eu10.hana.ondemand.com/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    if (res.ok) {
      await AsyncStorage.setItem('userToken', 'abc');
      await AsyncStorage.setItem('Device', 'False');
      this.props.navigation.navigate('App');
    }
    else {
      showMessage({
        message: "Грешна парола или email!",
        type: "danger",
      });
    }
  };
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 80,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 20
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 20
  },
  box: {
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50,
    marginBottom: 0,
    marginHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  signInButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50,
    marginBottom: 0,
    marginHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#4f6beb"
  },
  signInText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})