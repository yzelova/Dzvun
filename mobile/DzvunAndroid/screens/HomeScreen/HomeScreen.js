import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavigationActions from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user:""
    }
  }

  componentDidMount(){
    const nav = this.props.nav;
    this.setState({nav});
    this.getUserEmail();
  }


  static navigationOptions = ({navigation }) => ({
    title: "Начало",
    drawerLabel: "Начало",
    headerLeft: (
      <TouchableOpacity style={styles.menuButton}  onPress={()=>navigation.toggleDrawer()}>
            <Icon name="navicon" size={30} style={styles.menuIcon} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'cornflowerblue',
    },
    headerTintColor: '#fff',
  });

  async getUserEmail (){
        const user = await AsyncStorage.getItem('userEmail');
        this.setState({user});
  }
  
  render() {
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(this.state.user);
    console.log('000000000000000000000000000000000');
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../../assets/images/dzvun-logo.png')
              }
              style={
                styles.welcomeImage
              }
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Добре дошли в Dzvun!</Text>
            <Text style={styles.getStartedText}>
              Управлявайте устройствата си бързо и сигурно!
            </Text>
          </View>
        </ScrollView>

      </View>
    );
  }

}