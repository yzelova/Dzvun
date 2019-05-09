import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  static navigationOptions = ({navigation }) => ({
    title: 'Устройства',
    drawerLabel: 'Устройства',
    headerLeft: (
      <TouchableOpacity style={styles.menuButton}  onPress={()=>navigation.toggleDrawer()}>
            <Icon name="navicon" size={30} style={styles.menuIcon} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'cornflowerblue',
    },
    headerTintColor: '#fff',
  });



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
      const images = (await (await fetch('http://localhost:5000/timeline', {
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
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.device == 'True' ?
          <ScrollView style={styles.screen}>
            <Text style={styles.text}>
              В момента имате 1 свързано устройство и то показва:
            </Text>
            {this.state.loadingImages ?
              <Text> 0 Снимки </Text> :
              <View style={styles.container}>
                {renderedImages}
              </View>
            }
          </ScrollView>
          :
          <View style={styles.screen}>
            <View>
              <Text style={styles.text}>
                В момента нямате свързани устройства.
              </Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('BluetoothScan')}>
              <Text style={{fontSize: 50, textAlign: 'center', color: '#fff'}}>+</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    );
  }
}