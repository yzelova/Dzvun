import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground 
} from 'react-native';

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
                    require('../assets/images/landing-screen.png')
                }
                style={styles.backgroundImage}>
                    <Image
                        source={
                            require('../assets/images/dzvun-logo-transparent.png')
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

const styles = StyleSheet.create({
    backgroundImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: 'cover',
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginTop: 100,
        marginLeft: -10,
    },
    textContainer: {
        marginHorizontal: 50,
        marginTop: 10
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    logInText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    logInButton: {
        margin: 10,
        borderRadius: 7,
        padding: 10,
        backgroundColor: '#4f6beb'
    },
    signUpText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff'
    },
    signUpButton: {
        margin: 5
    },
    signUpButtonText: {
        fontSize: 14,
        color: '#4f6beb',
        textAlign: 'center'
    }

})