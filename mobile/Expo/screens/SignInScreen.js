import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    TextInput,
    View,
    Button
  } from 'react-native';
  

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View>
          <TextInput secureTextEntry={false} style= {styles.usernamebox} placeholder='Username' />
          <TextInput secureTextEntry={true} style= {styles.passwordbox} placeholder='Password' />
          <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
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
  

  const styles = StyleSheet.create({
    usernamebox:{
      padding:50,
      fontSize:30
    },
    passwordbox:{
      padding:50,
      fontSize:30
    }
  })