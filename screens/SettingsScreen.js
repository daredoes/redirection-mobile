import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Button, TouchableOpacity, Alert, Text, StyleSheet} from 'react-native';
import {FileSystem, Constants} from 'expo';
import {RedirectionSettings} from '../components/RedirectionSettings';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props){
    super(props);
  }



  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={{paddingTop: Constants.statusBarHeight}}>
        {this.props.screenProps.settings.urls.map((item, index) => (
           <TouchableOpacity style={{ backgroundColor: "blue"}} key={index} onPress={() => {
            this.props.screenProps.switchItem(item);
            this.props.navigation.navigate("Site");
          }} onLongPress={() => {
          }}>
          <Text style={styles.buttonText}>{item.name}</Text>
          <Text style={styles.buttonText}>{item.url}</Text>
          </TouchableOpacity>
        ))}
        </View>;
  }
}

var styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 24,
    textAlign: 'center'
  }
});
