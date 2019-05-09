import React from 'react';
import {
  View,
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


  render() {
    return (
      <View style={styles.view}>
      </View>
    );
  }

}