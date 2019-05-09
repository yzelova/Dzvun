import React from 'react';
import { Button, Text, View, Platform,Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import DevicesScreen from '../screens/DevicesScreen/DevicesScreen';
import SetWifiScreen from '../screens/SetWifiScreen/SetWifiScreen';
import LinksScreen from '../screens/LinksScreen/LinksScreen';
import BluetoothScanScreen from '../screens/BluetoothScanScreen/BluetoothScanScreen';
import SignOutScreen from '../screens/SignOutScreen/SignOutScreen';
import GalleryScreen from '../screens/GalleryScreen/GalleryScreen';
import MenuButton from '../components/MenuButton/MenuButton';

import styles from './styles';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: LinksScreen },
});

HomeStack.navigationOptions = {
  drawerLabel: 'Начало',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='info'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: LinksScreen },
});

SettingsStack.navigationOptions = {
  drawerLabel: 'Настройки',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='settings'
    />
  ),
};

const DevicesStack = createStackNavigator({
  Devices: { screen: DevicesScreen },
  WiFiSetup: { screen: SetWifiScreen },
  BluetoothScan: {screen: BluetoothScanScreen}
});

DevicesStack.navigationOptions = {
  tabBarLabel: 'Устройства',
  drawerLabel: 'Устройства',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='visibility'
    />
  ),
};

const GalleryStack = createStackNavigator({
  Gallery: { screen: GalleryScreen },
});

GalleryStack.navigationOptions = {
  tabBarLabel: 'Галерия',
  drawerLabel: 'Галерия',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='visibility'
    />
  ),
};

const SignOutStack = createStackNavigator({
  SignOut: { screen: SignOutScreen },
});

SignOutStack.navigationOptions = {
  tabBarLabel: 'Изход',
  drawerLabel: 'Изход',
  tabBarIcon: ({ focused }) => (
    <Icon
      name='visibilisty'
    />
  ),
};

const HeaderStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: LinksScreen },
});

HeaderStack.navigationOptions = {
  drawerLabel: ()=>{
    return (
    <View styles={styles.container}>
      <Image
            style={styles.image}
            source={
            require('../assets/images/dzvun-logo-transparent.png')
            }
        />
    </View>)
  },
  tabBarIcon: ({ focused }) => (
    <Icon
      name='info'
    />
  ),
};

export default createDrawerNavigator(
  {
    Header: {screen: HeaderStack},
    Home: { screen: HomeStack },
    Gallery: {screen: GalleryStack},
    Devices: { screen: DevicesStack },
    Settings: { screen: SettingsStack },
    Signout:  {screen:SignOutStack}
  },
  {
    navigationOptions: ({ navigation }) => ({

      headerRight : ({navigation}) => {
        return (<Text>Test</Text>);
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  }
);
