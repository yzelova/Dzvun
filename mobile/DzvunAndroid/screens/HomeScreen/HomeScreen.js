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
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { Buffer } from 'buffer';
import MenuButton from '../../components/MenuButton/MenuButton';
import NavigationActions from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user:"",
      liveImage:null,
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


  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const ret = Buffer.from(binary, 'ascii').toString('base64');
    return ret;
  }


  async _getLiveImage (){
    this.setState({loadingLogin:true});
    const user = await AsyncStorage.getItem("userEmail");
    const res = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/live-image/set-state', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: user,
      })
    })
    console.log(res);
    if (res.ok) {
        this.getLiveImage(user);
    }
  }

  getLiveImage = async (user) =>{
      this.setState({isLoading:true});
      for (i=0;;i++){    
        const res = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/live-image/get-image', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user: user,
        })
      })
      console.log('23412451241251245125241352153612453131351224');
      console.log(res);
      if(res.ok){
        console.log(res);
        console.log('070707070707070707070707070707070707070707070707070707070707')
        const image =await( res.json());
        const base64 = this.arrayBufferToBase64(image.image.data);
        console.log(base64);
        this.setState({liveImage:base64});
        const response = await fetch('https://dzvunserver.cfapps.eu10.hana.ondemand.com/live-image/delete-image', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: user,
        })
      })
      this.setState({isLoading:false});
        break;
      }
      }
  }

  renderImage(){
    const image = this.state.liveImage;
    const src = 'data:image/jpeg;base64,' + image;
    return (
          <View style={styles.imageContainer} >
            <Image style={styles.image} source={{ uri: src }}  />
          </View>
    )
  }
  
  render() {
    console.log('+++++++++++++++++++++++++++++++++');
    console.log(this.state.user);
    console.log('000000000000000000000000000000000');
    let renderedImage=this.renderImage();
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
            {this.state.isLoading?
            <ActivityIndicator style={styles.activityIndicator} size="large" color="#0000ff" />
            :
            <View>
                {this.state.liveImage?
                  <View>{renderedImage}</View>
                :
                <View>
                  <Text style={styles.getStartedText}>Добре дошли в Dzvun!</Text>
                  <Text style={styles.getStartedText}>
                    Управлявайте устройствата си бързо и сигурно!
                  </Text>
                </View> 
                }
            </View>
            }
            <TouchableOpacity style={styles.signInButton} onPress={()=>this._getLiveImage()}>
              <Text style={styles.signInText}>Снимка на живо</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }

}