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
  TouchableOpacity,
} from 'react-native';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import styles from './styles';


export default class SignInScreen extends React.Component {

  static navigationOptions = {
    title: 'Влезте в своя акаунт',
    headerStyle: {
      backgroundColor: '#4f6beb',
    },
    headerTintColor: '#fff',

  }

  onPressSignUp = () => {
    this.props.navigation.navigate('SignUp');
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
              require('../../assets/images/dzvunicon.png')
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
        <View style={styles.textContainer}>
          <Text style={styles.signUpText}>Нямате акаунт? Създайте нов сега!</Text>
          <TouchableOpacity style={styles.signUpButton} onPress={this.onPressSignUp}>
            <Text style={styles.signUpButtonText}>Регистрация</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    const res = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/login', {
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