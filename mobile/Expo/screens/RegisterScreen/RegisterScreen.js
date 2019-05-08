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
import styles from './styles';


export default class SignInScreen extends React.Component {

    static navigationOptions = {
        title: 'Регистрация',
        headerStyle: {
            backgroundColor: '#4f6beb',
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
            })
        })
        if (res.ok) {
            await AsyncStorage.setItem('userToken', 'abc');
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

