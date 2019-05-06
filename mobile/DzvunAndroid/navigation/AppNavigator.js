import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));