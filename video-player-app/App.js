import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeScreen, DetailsScreen, SettingsScreen } from './screens';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    Home: AppNavigator,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      initialRouteName: 'Home',
      activeTintColor: '#fff',
      activeBackgroundColor: '#aaaaff',
      inactiveTintColor: '#aaaaff',
      style: {
        height: 'auto',
      },
      tabStyle: {
        paddingVertical: 10,
      },
      labelStyle: {
        fontSize: 16,
      },
    },
  }
);

const AppContainer = createAppContainer(TabNavigation);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
