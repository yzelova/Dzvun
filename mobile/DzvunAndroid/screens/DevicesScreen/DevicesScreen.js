import React from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DevicesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      images: [],
      loadingImages: true
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
      navigation.addListener ('willFocus', () =>{
      this._LoadDevices();
    });
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
    if(!this.state.device){
      const device = await AsyncStorage.getItem('futureDeviceName');
      console.log('------------------------------------');
      console.log(device);
      this.setState({ device }); 
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.device ?
          <ScrollView contentContainerStyle={styles.screen}>
            <Text style={styles.text}>
              В момента имате 1 свързано устройство:
            </Text>
            <TouchableOpacity style={styles.foundDevice}  >
              <View style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
                }}>
                  <Text style={styles.deviceText}> {this.state.device}
                  </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          :
          <View style={styles.screen}>
            <View>
              <Text style={styles.text}>
                В момента нямате свързани устройства.
              </Text>
            </View>
          </View>
        }
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('BluetoothScan')}>
              <Text style={{fontSize: 50, textAlign: 'center', color: '#fff'}}>+</Text>
            </TouchableOpacity>
      </ScrollView>
    );
  }
}