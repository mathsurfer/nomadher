import * as React from 'react';
import BottomToolbar from 'react-native-bottom-toolbar'
import { View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons, MaterialIcons,Icon } from '@expo/vector-icons';

import ExploreScreen from './Look4Host';
import SavedScreen from './Profile';
import TripsScreen from './notifications';
import InboxScreen from './SafetyJauge';


//A simple tab bar on the bottom of the screen that lets you switch between different routes. Routes are lazily initialized -- their screen components are not mounted until they are first focused.
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
 
export default class App extends React.Component {
  tabs = [
    {
      key: 'profile',
      icon: 'person',
      label: 'profile',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'get hosted',
      icon: 'map',
      label: 'Get Hosted',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'Safetyjauge',
      icon: 'safe',
      label: 'Safety jauge',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Your screen contents depending on current tab. */}
        </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}