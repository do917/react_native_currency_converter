import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
      }
    },
    Options: {
      screen: Options,
      navigationOptions: {
        headerTitle: 'Options'
      } 
    },
    Themes: {
      screen: Themes,
      navigationOptions: {
        headerTitle: 'Themes' 
      }
    }
  }, 
  {
    // helps with screen transitions(header transitioning slower than rest of screen)
    headerMode: 'screen'
  }
)

//separated out currencyList because of headerMode conflict
const CurrencyListStack = StackNavigator({
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title,
    }),
  }
})

export default StackNavigator(
  {
    Home: {
      screen: HomeStack
    },
    CurrencyList: {
      screen: CurrencyListStack
    }
  },
  {
    mode: 'modal',
    cardStyle: {
      paddingTop: StatusBar.currentHeight
    },
    // no headers
    headerMode: 'none'
  }
)