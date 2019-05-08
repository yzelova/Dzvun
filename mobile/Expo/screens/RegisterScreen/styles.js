import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    label: {
        paddingTop: 80,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 20
    },
    imageView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        marginTop: 20
    },
    box: {
        paddingLeft: 25,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#d6d7da"
    },
    signInButton: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#fff",
        backgroundColor: "#4f6beb"
    },
    signInText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
});