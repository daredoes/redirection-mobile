import { Notifications, FileSystem } from 'expo';
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';
import CategoryView from '../components/CategoryView';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default class CategoryNavigator extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return <CategoryView reload={this.props.screenProps.reload} item={this.props.screenProps.item} items={this.props.screenProps.items} navigate={this.props.navigation.navigate}/>;
  }
}
