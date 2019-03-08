import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button,  AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SetWifiScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null
    };
  }


  static navigationOptions = {

  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.label}>Свързани сте с: Dzvun</Text>
        <Text style={styles.label}>Мрежа:</Text>
        <TextInput secureTextEntry={false} style={styles.usernamebox} placeholder='Мрежа' />
        <Text style={styles.label}>Парола:</Text>
        <TextInput secureTextEntry={true} style={styles.passwordbox} placeholder='Парола' />
        <Button title="Запамети" onPress={this._saveWiFiSettings.bind()} />
      </View>
    );
  }

  _saveWiFiSettings = async() =>{
    await AsyncStorage.setItem('Device', 'True');
    this.props.navigation.navigate('Devices');
  }
}

const styles = StyleSheet.create({
  label:{
    padding:20,
    fontSize:25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  usernamebox: {
    padding: 50,
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 30,
    borderBottomWidth: 0,
    borderBottomColor: '#rgb(200,200,200)'
  },
  passwordbox: {
    paddingBottom: 50,
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 30,
    borderBottomWidth: 0,
    borderBottomColor: '#rgb(200,200,200)'
  },
});
