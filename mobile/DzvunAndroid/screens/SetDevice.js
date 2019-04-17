import React from 'react';
import { ScrollView, StyleSheet,View,Text } from 'react-native';

export default class SetWifiScreen extends React.Component {
  static navigationOptions = {
    
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
