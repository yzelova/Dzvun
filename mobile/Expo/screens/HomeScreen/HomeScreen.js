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
import styles from './styles';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Начало",
    headerStyle: {
      backgroundColor: '#4f6beb',
    },
    headerTintColor: '#fff',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../../assets/images/dzvun-logo.png')
              }
              style={
                styles.welcomeImage
              }
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>Добре дошли в Dzvun!</Text>
            <Text style={styles.getStartedText}>
              Управлявайте устройствата си бързо и сигурно!
            </Text>
          </View>
        </ScrollView>

      </View>
    );
  }

}