import React from 'react';
import { Button, Text, View, Platform } from 'react-native';
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
import MenuButton from '../components/MenuButton/MenuButton';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: LinksScreen },
});

HomeStack.navigationOptions = {
  drawerLabel: 'Инфо',
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


export default createDrawerNavigator(
  {
    Home: { screen: HomeStack },
    Devices: { screen: DevicesStack },
    Settings: { screen: SettingsStack },
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
