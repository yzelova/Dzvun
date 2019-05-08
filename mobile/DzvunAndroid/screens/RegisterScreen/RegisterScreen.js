import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Text,
    StyleSheet,
    TextInput,
    View,
    Button,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import firebase from 'react-native-firebase';
import styles from './styles';


export default class SignInScreen extends React.Component {

    static navigationOptions = {
        title: 'Регистрация',
        headerStyle: {
            backgroundColor: 'cornflowerblue',
        },
        headerTintColor: '#fff',

    }

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }

      componentDidMount() {
    console.log("Component did mount");
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

    async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
      // this.showAlert(title, body);
      // alert('message');

      const localNotification = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        // .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        // .setData(notification.data)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);
        

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });


    const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

   async getToken() {
    console.log("------------------------------------GettingToken-----------------------------");
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log("++++++++++++++++++++++++++++TOKEN++++++++++++++++++++++++")
    console.log('fcmToken:', fcmToken);
    this.setState({fcmToken});
  }

   async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

    render() {
        return (
            <View style={styles.view}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View>
                        <View style={styles.imageView}>
                            <Image
                                source={
                                    require('../../assets/images/dzvunicon.png')
                                }
                                style={styles.image}
                            />
                        </View>
                        <TextInput secureTextEntry={false} style={styles.box} onChangeText={(text) => this.setState({ firstName: text })} placeholder='Собствено име' />
                        <TextInput secureTextEntry={false} style={styles.box} onChangeText={(text) => this.setState({ lastName: text })} placeholder='Фамилия' />
                        <TextInput autoCapitalize='none' secureTextEntry={false} style={styles.box} onChangeText={(text) => this.setState({ email: text })} placeholder='Email' keyboardType='email-address' />
                        <TextInput autoCapitalize='none' secureTextEntry={true} style={styles.box} onChangeText={(text) => this.setState({ password: text })} placeholder='Парола' />
                        <TouchableOpacity style={styles.signInButton} onPress={this._signUpAsync}>
                            <Text style={styles.signInText}>Регистрация</Text>
                        </TouchableOpacity>
                        <FlashMessage position="top" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _signUpAsync = async () => {
        if (this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "") {
            showMessage({
                message: "Всички полета са задължителни!",
                type: "danger",
            })
            return;
        }
        const res = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/signup', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                token: this.state.fcmToken
            })
        })
        if (res.ok) {
            await AsyncStorage.setItem('userToken', 'abc');
            await AsyncStorage.setItem('userEmail', this.state.email);
            await AsyncStorage.setItem('Device', 'False');
            this.props.navigation.navigate('App');
        }
        else {
            showMessage({
                message: "Този Email вече е използван!",
                type: "danger",
            });
        }
    };
}

