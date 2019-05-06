import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Text,
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';

import styles from './styles';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Моля влезте в акаунта си',
  };

  render() {
    return (
      <View>
        <Text style={styles.label}>Потребителско Име:</Text>
        <TextInput secureTextEntry={false} style={styles.usernamebox} placeholder='Username' />
        <Text style={styles.label}>Парола:</Text>
        <TextInput secureTextEntry={true} style={styles.passwordbox} placeholder='Password' />
        <Button title="Вход!"  style={styles.signinbutton} onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    await AsyncStorage.setItem('Device', 'False');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
