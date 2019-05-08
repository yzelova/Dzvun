import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  label:{
    padding:20,
    fontSize:25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  usernamebox: {
    padding: 50,
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 30,
    borderBottomWidth: 0,
    borderBottomColor: '#rgb(200,200,200)'
  },
  passwordbox: {
    paddingBottom: 50,
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 30,
    borderBottomWidth: 0,
    borderBottomColor: '#rgb(200,200,200)'
  },
  scanButton: {
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,
    marginBottom: 0,
    marginHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "cornflowerblue"
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  }
});
