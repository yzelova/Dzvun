import React from 'react';
import {
  View,
  AsyncStorage,
  TouchableOpacity,
  Text
} from 'react-native';
import styles from './styles';


export default class SignOutScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'cornflowerblue',
    },
    headerTintColor: '#fff',

  }

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
  }

  clearStorage = async () =>{
    await AsyncStorage.clear();
  }


  render() {
    return (
      <View style={styles.imageView}>
          <TouchableOpacity style={styles.logOutButton} onPress={()=>this.clearStorage()}>
            <Text style={styles.logOutText}>Излез</Text>
          </TouchableOpacity>
      </View>
    );
  }

}