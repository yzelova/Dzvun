import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
