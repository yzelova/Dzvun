import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

// Създаваме отделни групи от екрани, които комбинираме в навигацията на приложението
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
import LandingScreen from '../screens/LandingScreen/LandingScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/RegisterScreen/RegisterScreen';

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