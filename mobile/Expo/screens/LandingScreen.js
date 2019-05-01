import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

export default class LandingScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    onPressLogin = () => {
        this.props.navigation.navigate('Login');
    }

    onPressSignUp = () => {

    }

    render() {
        return (
            <View style={styles.view}>
                <Image
                    source={
                        require('../assets/images/dzvun-logo.png')
                    }
                    style={
                        styles.image
                    }
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Добре дошли в Dzvun!</Text>
                    <Text style={styles.text}>За да продължите, моля влезте в акаунта си:</Text>
                    <TouchableOpacity style={styles.logInButton} onPress ={this.onPressLogin}>
                        <Text style={styles.logInText}>Вход</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.signUpText}>Нямате акаунт? Създайте нов сега!</Text>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>Регистрация</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        textAlign: 'center'
    },
    logInText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    logInButton: {
        margin: 10,
        borderRadius: 7,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
        backgroundColor: '#4f6beb'
    },
    signUpText: {
        fontSize: 14,
        textAlign: 'center'
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