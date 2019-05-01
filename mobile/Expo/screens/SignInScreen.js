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
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Моля влезте в акаунта си',
  };

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
          <Text style={styles.label}>Email:</Text>
          <TextInput autoCapitalize = 'none' secureTextEntry={false} style={styles.usernamebox} onChangeText={(text) => this.setState({email: text})} placeholder='Email' />
          <Text style={styles.label}>Парола:</Text>
          <TextInput autoCapitalize = 'none' secureTextEntry={true} style={styles.passwordbox} onChangeText={(text) => this.setState({password: text})} placeholder='Парола' />
          <Button title="Вход!" style={styles.signinbutton} onPress={this._signInAsync} />
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
      if(res.ok){
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
  label:{
    paddingTop:80,
    paddingBottom:10,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize:25
  },
  usernamebox: {
    padding: 50,
    paddingLeft:25,
    paddingTop:10,
    paddingBottom: 0,
    fontSize: 30,
    borderBottomWidth:0,
    borderBottomColor:'#rgb(200,200,200)'
  },
  passwordbox: {
    paddingBottom: 50,
    paddingLeft:25,
    paddingTop:10,
    fontSize: 30,
    borderBottomWidth:0,
    borderBottomColor:'#rgb(200,200,200)'
  },
  signinbutton: {
    paddingLeft:30,
    paddingRight:30,
    paddingTop:30,
    fontSize:30
  },
})