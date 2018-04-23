import { Notifications, FileSystem } from 'expo';
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';
import CategoryNavigator from './CategoryNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default class RootNavigator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: {},
      items: {}
    }
  }

  switchItems = (item) => {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + item.filename).then((read_item) => {
      the_item = JSON.parse(read_item);
      this.setState({
          item: item,
          items: the_item
        });
      });
  }

  reload = (item, download) => {
    if(download){
      FileSystem.downloadAsync(item.url + "/data.json", FileSystem.documentDirectory + item.filename).then((fileHeader) => {
        if(fileHeader.status != 200){
          console.log("Failed");
          console.log(fileHeader);
        }
        else{
          this.switchItems(item);
        }
      });
    }
    else{
      this.switchItems(item);
    }

  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <this.props.navigator screenProps={{settings: this.props.settings, item: this.state.item, items: this.state.items, switchItem: this.switchItems, reload: this.reload}}/>;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
