import { StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    marginTop: 50,
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
    marginTop: 50,
    marginBottom: 0,
    marginHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#4f6beb"
  },
  textContainer: {
    marginHorizontal: 50,
    marginTop: 20
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000'
  },
  signUpButton: {
    margin: 5
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#4f6beb',
    textAlign: 'center'
  },
  signInText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
})