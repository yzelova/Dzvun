import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  addButton: {
    alignSelf: 'flex-end',
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#4f6beb',
    borderRadius: 35,
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10
  },
  container: {
    marginTop: 20,
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'column'
  },
  box: {
    paddingTop: 30,
    width: '70%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#BBBBBB'
  },
  boxItems: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#BBBBBB'
  },
  text: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontSize: 16
  },
  menuButton:{
    paddingHorizontal:20
  },
  menuIcon:{
        color:'white'
    },
  image:{
    width: 250,
    height: 250,
    marginLeft:'auto',
    marginRight:'auto',
  },
  imageContainer:{
    paddingTop:10,
    paddingBottom:10,
    borderTopWidth:0.3
  }
});
