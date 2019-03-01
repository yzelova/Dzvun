import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';


export default class DevicesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Devices',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.screen}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LinksStack')}>
            <View style={styles.box}>
              {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
              <Image source={require('../assets/images/plus.png')} style={{ width: 250, height: 250 }} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>
              You currently have 0 devices
          </Text>
          </View>
        </View>
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
    width: '70%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#BBBBBB'
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
