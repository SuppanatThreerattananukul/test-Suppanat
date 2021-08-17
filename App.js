import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import home from './component/Home';
import login from './component/Login';
import listView from './component/ListView';
import splashScreen from './component/splashScreen';

const App = createStackNavigator(
  {
    home: {
      screen: home,
      navigationOptions: {
        header: null,
      },
    },

    login: {
      screen: login,
      navigationOptions: {
        header: null,
      },
    },

    listView: {
      screen: listView,
      navigationOptions: {
        header: null,
      },
    },
  },
  { initialRouteName: 'login' }
);

//Not show warning
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;


export default createAppContainer( createSwitchNavigator(
  {
    splashScreen: splashScreen,
    App: App,
  },
  {
    initialRouteName: 'splashScreen',
  }
));
