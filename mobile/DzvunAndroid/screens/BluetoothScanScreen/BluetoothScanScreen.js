import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button, AsyncStorage, TouchableOpacity,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BluetoothSerial from 'react-native-bluetooth-serial';
import buffer from 'buffer';

import styles from './styles';

export default class BluetoothScanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      info: "",
      discovering: false,
      devicesFormatted: []
    };
  }

   componentWillMount() {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        this.setState({ isEnabled, devices, devicesFormatted });
      }
    );

    BluetoothSerial.on("bluetoothEnabled", () =>
      console.log("Bluetooth enabled")
    );

    BluetoothSerial.on("bluetoothDisabled", () =>
      console.log("Bluetooth disabled")
    );

    BluetoothSerial.on("error", err => {
      console.log("error", err);
    });

    BluetoothSerial.on("connectionLost", () => {
      if (this.state.device) {
        this.connect(this.state.device)
          .then(res => {})
          .catch(err => {
            console.log("error", err);
          });
      }
    });

    this.discoverUnpaired();
  }

  toggleBluetooth (value) {
      if (value === true) {
        this.enable()
      } else {
        this.disable()
      }
  }
  enable () {
        BluetoothSerial.enable()
        .then((res) => this.setState({ isEnabled: true }))
        .catch((err) => console.log(err.message))
  }

  discoverUnpaired () {
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        this.setState({ unpairedDevices, discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }

  

  pairDevice (device) {
      BluetoothSerial.pairDevice(device.id)
      .then((paired) => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`)
          const devices = this.state.devices
          devices.push(device)
          this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
        } else {
          console.log(`Device ${device.name} pairing failed`)
        }
      })
      .catch((err) => console.log(err.message))
  }

  cancelDiscovery () {
    if (this.state.discovering) {
      BluetoothSerial.cancelDiscovery()
      .then(() => {
        this.setState({ discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }


  connect (device) {
      this.setState({ connecting: true })
      BluetoothSerial.connect(device.id)
      .then((res) => {
        Toast.showShortBottom(`Connected to device ${device.name}`)
        this.setState({ device, connected: true, connecting: false })
      })
      .catch((err) => console.log(err.message))
    }

  findAndPair(){
    if (this.state.unpairedDevices){
      this.state.unpairedDevices.forEach(device => {
        if(device.name=="Dzvun"){
          this.pairDevice(device);
        }
      });
    }
  }

  findAndConnect(){
    if (this.state.unpairedDevices){
      this.state.unpairedDevices.forEach(device => {
        if(device.name=="Dzvun"){
          this.connect(device);
        }
      });
    }
  }

  write(data){
    console.log("WRITING BLUETOOTH...............................\n.....................\n...............\n")
    BluetoothSerial.write("Dataaaaaaaaaaaaaaa")
  }

  hello = async (device) =>{
    await AsyncStorage.setItem('futureDeviceName',device.name);
    await AsyncStorage.setItem('futureDeviceId',device.id);
    this.props.navigation.navigate('WiFiSetup');
  }



  render() {
    return (
      <View contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        {this.state.discovering?
          <View>
            <Text style={styles.scanningText}>В момента сканираме за устройства</Text>
            <Text style={styles.bottomScanningText}> близо до вас </Text>
            <ActivityIndicator style={styles.activityIndicator} size="large" color="#0000ff" />
          </View>
          :
          <View>
            <Text style={styles.headerText}> Намерени устройства: </Text>
            <View style={styles.devicesView} >
              <ScrollView>
              {this.state.unpairedDevices?
                  this.state.unpairedDevices.map((device, key) =>
                    device.name=='Dzvun'?
                      <TouchableOpacity  key={device.id} style={styles.suggestedDevice} onPress={()=>this.hello(device)}>
                            <View style={{
                              paddingHorizontal: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center"
                              }}>
                              <Text style={styles.suggestedDeviceText} key={device.id}> {device.name}
                              </Text>
                              <Icon name="right" size={30} color={'white'} />
                            </View>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity  key={device.id} style={styles.foundDevice}  onPress={()=>this.hello(device)}>
                            <View style={{
                              paddingHorizontal: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center"
                              }}>
                              <Text style={styles.deviceText} key={device.id}> {device.name}
                              </Text>
                            </View>
                      </TouchableOpacity>
                  )
                  :
                  <Text> Няма намерни устройства</Text>
              }
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.scanButton} onPress={()=>this.discoverUnpaired()}>
                  <Text style={styles.scanButtonText}>Сканирай пак</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}
