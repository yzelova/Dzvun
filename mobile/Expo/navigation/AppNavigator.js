import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
import LandingScreen from '../screens/LandingScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator({ Landing: LandingScreen });


const LoginStack = createStackNavigator({
  Login: { screen: LogInScreen }
}
)

const SignUpStack = createStackNavigator({
  SignUp: { screen: SignUpScreen }
}
)

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    Login: LoginStack,
    SignUp: SignUpStack
  },
  {
    initialRouteName: 'AuthLoading',
  },

));