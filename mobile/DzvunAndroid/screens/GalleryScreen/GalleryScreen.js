import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage,ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class GalleryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      images: [],
      loadingImages: true
    };
  }

  componentDidMount() {
      this.setupDevicesAndImages();
  }

  static navigationOptions = ({navigation }) => ({
    title: 'Галерия',
    drawerLabel: 'Галерия',
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

  setDevices = async () =>{
    const device = await AsyncStorage.getItem('futureDeviceName');
    this.setState({device});
  } 

  setupDevicesAndImages = async () =>{
    await this.setDevices();
    if(this.state.device) await this._LoadImages();
    this.timer = setInterval(() => this._LoadImages(), 5000)
  }

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
        <View style={styles.imageContainer} key={id}>
          <Image style={styles.image} source={{ uri: src }} key={id} />
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
    const email = await AsyncStorage.getItem('userEmail');
    if (this.state.device) {
      const images = (await (await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/timeline', {
        method: "POST",
        redentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })).json()).imageRes;
      //console.log(images);
      const imagesBase64 = [];
      images.forEach(image => {
        const base64 = this.arrayBufferToBase64(image.data);
        imagesBase64.push(base64);
      });
      this.setState({ loadingImages: false, images: imagesBase64 })
    }
    else {
      this.setDevices();
    }
  }

  render() {
    let renderedImages = this.renderImages();
    return (
      <View contentContainerStyle={styles.container}>
        {this.state.device =="Dzvun"?
            <View>
              <View contentContainerStyle={styles.screen}>
                <ScrollView>
                  {this.state.loadingImages ?
                    <ActivityIndicator style={styles.activityIndicator} size="large" color="#0000ff" /> :
                    <View>{renderedImages}</View>
                  }
                </ScrollView>
              </View>
            </View>
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
      </View>
    );
  }
}