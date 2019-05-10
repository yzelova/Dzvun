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
  logOutButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 50,
    marginBottom: 0,
    marginHorizontal: 20,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "cornflowerblue",
    backgroundColor: "cornflowerblue"
  },
  logOutText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft:10,
    paddingRight:10
  }
})