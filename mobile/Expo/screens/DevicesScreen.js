import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';


export default class DevicesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: 'False'
    };
  }

  static navigationOptions = {
    title: 'Устройства',
    //header: null,
  };

  _LoadDevices = async () => {
    const device = await AsyncStorage.getItem('Device');
    this.setState({ device });
  }

  render() {
    const { navigate } = this.props.navigation;
    this.state.device == 'False' ? this._LoadDevices() : null;
    return (
      <ScrollView style={styles.container}>
        {this.state.device == 'True' ?
          <View style={styles.screen}>
            <Image source={require('./../assets/images/robot-dev.png')} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('WiFiSetup')}>
              <View style={styles.boxItems}>
                {}
                <Image source={require('../assets/images/plus.png')} style={{ width: 100, height: 100 }} />
              </View>
            </TouchableOpacity>
            <Text style={styles.text}>
              В момента имате 1 свързано устройство
            </Text>
          </View>
          :
          <View style={styles.screen}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('WiFiSetup')}>
              <View style={styles.box}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                <Image source={require('../assets/images/plus.png')} style={{ width: 250, height: 250 }} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.text}>
                В момента нямате свързани устройства
              </Text>
            </View>
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    paddingTop: 30,
    width: '70%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#BBBBBB'
  },
  boxItems: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#BBBBBB'
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
