import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';

export default class DevicesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: 'False',
      images: [],
      loadingImages: true
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this._LoadImages(), 1000)
  }

  static navigationOptions = {
    title: 'Устройства',
    //header: null,
  };



  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const ret = Buffer.from(binary, 'ascii').toString('base64');
    return ret;
  }


  renderImages() {
    const ret = [];
    let id = 0;
    this.state.images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image;
      ret.push(
        <View key={id}>

          <Image style={{ width: 250, height: 250 }} source={{ uri: src }} key={id} />
        </View>
      )
      id++;
    });
    return ret;
  }

  _LoadDevices = async () => {
    const device = await AsyncStorage.getItem('Device');
    this.setState({ device });
  }

  _LoadImages = async () => {
    if (this.state.device == 'True') {
      const images = (await (await fetch('https://dzvun-server.cfapps.eu10.hana.ondemand.com/timeline', {
        method: "GET"
      })).json()).imageRes;
      //console.log(images);
      const imagesBase64 = [];
      images.forEach(image => {
        const base64 = this.arrayBufferToBase64(image.data);
        imagesBase64.push(base64);
      });
      this.setState({ loadingImages: false, images: imagesBase64 })
    }
  }

  render() {
    const renderedImages = this.renderImages();
    this.state.device == 'False' ? this._LoadDevices() : null;
    return (
      <ScrollView style={styles.container}>
        {this.state.device == 'True' ?
          <View style={styles.screen}>
            <Text style={styles.text}>
              В момента имате 1 свързано устройство и то показва:
            </Text>
            {this.state.loadingImages ?
              <Text> 0 Снимки </Text> :
              <View style={styles.container}>
                {renderedImages}
              </View>
            }
          </View>
          :
          <View style={styles.screen}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('WiFiSetup')}>
              <View style={styles.box}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                <Image source={require('../assets/images/plus.png')} style={{ width: 250, height: 250, paddingBottom:20 }} />
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
