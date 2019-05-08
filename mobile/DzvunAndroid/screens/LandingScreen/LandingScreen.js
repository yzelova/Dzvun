import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground 
} from 'react-native';
import styles from './styles';

export default class LandingScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    onPressLogin = () => {
        this.props.navigation.navigate('Login');
    }

    onPressSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
                <ImageBackground 
                source={
                    require('../../assets/images/landing-screen.png')
                }
                style={styles.backgroundImage}>
                    <Image
                        source={
                            require('../../assets/images/dzvun-logo-transparent.png')
                        }
                        style={
                            styles.image
                        }
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Добре дошли в Dzvun!</Text>
                        <Text style={styles.text}>За да продължите, моля влезте в своя акаунт:</Text>
                        <TouchableOpacity style={styles.logInButton} onPress={this.onPressLogin}>
                            <Text style={styles.logInText}>Вход</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.signUpText}>Нямате акаунт? Създайте нов сега!</Text>
                        <TouchableOpacity style={styles.signUpButton} onPress={this.onPressSignUp}>
                            <Text style={styles.signUpButtonText}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
        )
    }
}
