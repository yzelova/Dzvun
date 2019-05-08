import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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