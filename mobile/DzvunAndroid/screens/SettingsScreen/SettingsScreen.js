import React from 'react';
import {
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import buffer from 'buffer';
import styles from './styles';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: "",
      discovering: false,
      devicesFormatted: []
    }
    ;
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

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Button title="Scan" onPress={()=>this.discoverUnpaired()} />
        <Text>Устройства:</Text>
        {this.state.discovering?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          null
        }
        {this.state.unpairedDevices?
          this.state.unpairedDevices.map((device, key) =>
          <Text key={device.id} > {device.name} </Text>
          )
          :
          <Text> Няма </Text>
        }
        <Text> {JSON.stringify(this.state.unpairedDevices)}</Text>
        <Button title="Pair" onPress={()=>this.findAndPair()} />
        <Button title="Connect" onPress={()=>this.findAndConnect()} />
        <Button title="Send" onPress = { ()=> this.write("DATAAAAAAAAAAAAAAAAAAAAAAAAAA")} />
      </View>
    );
  }
}
