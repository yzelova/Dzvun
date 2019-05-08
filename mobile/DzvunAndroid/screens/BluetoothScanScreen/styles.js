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
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
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
  },
  bottomScanningText:{
    fontSize: 20,
    textAlign: 'center'
  },
  scanningText: {
    fontSize: 20,
    textAlign: 'center',
  },
  activityIndicator:{
      paddingTop:50,
      marginBottom:80
  },
  suggestedDevice:{
    backgroundColor:'lightgreen',
    marginHorizontal:5,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
  },
  foundDevice:{
    backgroundColor:'white',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:0.3,
    borderTopWidth:0.3
  },
  deviceText:{
      fontSize: 22,
  },
  suggestedDeviceText:{
    fontSize: 22,
    color:'white'
  },
  headerText:{
    fontSize:25,
    paddingBottom:5,
    paddingTop:10,
  },
  devicesView:{
    height:350
  }
});
