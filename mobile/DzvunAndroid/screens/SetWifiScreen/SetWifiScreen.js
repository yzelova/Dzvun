import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button, AsyncStorage, TouchableOpacity,ActivityIndicator } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import buffer from 'buffer';

import styles from './styles';

export default class SetWifiScreen extends React.Component {
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
    this.getFutureDeviceData();
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

  pairDevice (deviceId) {
      BluetoothSerial.pairDevice(deviceId)
      .then((paired) => {
        if (paired) {
          console.log(`Device paired successfully`)
          const devices = this.state.devices
          devices.push(device)
        } else {
          console.log(`Device pairing failed`)
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


  connect = async (deviceId) => {
      this.setState({ connecting: true })
      BluetoothSerial.connect(deviceId)
      .then((res) => {
        Toast.showShortBottom(`Connected to device`)
        this.setState({connected: true, connecting: false })
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

  sleep(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
    }
  }

  write(){
    console.log("CONNECTTOWIFI|"+this.state.network+"|"+this.state.password);
    BluetoothSerial.write("CONNECTTOWIFI|"+this.state.network+"|"+this.state.password);
  }

  getFutureDeviceData = async () =>{
    const futureDeviceName= await AsyncStorage.getItem('futureDeviceName');
    const futureDeviceId=await AsyncStorage.getItem('futureDeviceId');
    const user = await AsyncStorage.getItem('userEmail');
    this.setState({futureDeviceId,futureDeviceName,user});
    console.log(user+"----------------------"+futureDeviceId);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {this.state.isLoading?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <View>
            <Text style={styles.label}>Свързани сте с: {this.state.futureDeviceName}</Text>
            <Text style={styles.label}>Мрежа:</Text>
            <TextInput secureTextEntry={false} style={styles.usernamebox} placeholder='Мрежа' onChangeText={(text) => this.setState({ network: text })} />
            <Text style={styles.label}>Парола:</Text>
            <TextInput secureTextEntry={true} style={styles.passwordbox} placeholder='Парола' onChangeText={(text) => this.setState({ password: text })} />
            <Button title="Запамети" onPress={()=>this._saveWiFiSettings()} />
          </View>
        }
      </View>
    );
  }

  _saveWiFiSettings = async() =>{
    this.setState({isLoading:true});
    console.log(this.state.futureDeviceId+"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==");
    this.pairDevice(this.state.futureDeviceId);
    this.connect(this.state.futureDeviceId);
    this.sleep(3000);
    this.write();
    const res = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/add-device', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        device: this.state.futureDeviceId,
        user: this.state.userEmail
      })
    })
    this.setState({isLoading:false});
    this.props.navigation.navigate('Devices');
  }
}
