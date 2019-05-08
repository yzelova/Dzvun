import BluetoothSerial from 'react-native-bluetooth-serial';
import buffer from 'buffer';

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