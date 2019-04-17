import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';



export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>
          Hello
        </Text>
      </View>
    );
  }
}
