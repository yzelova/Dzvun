import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import LandingScreen from '../screens/LandingScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/SignInScreen';

const AuthStack = createStackNavigator({ Landing: LandingScreen });


const LoginStack = createStackNavigator({
  Login: { screen: LogInScreen }
}
)


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    Login: LoginStack
  },
  {
    initialRouteName: 'AuthLoading',
  },

));