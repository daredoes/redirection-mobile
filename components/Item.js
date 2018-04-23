import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Clipboard, Alert } from 'react-native';
import {WebBrowser} from 'expo';

export default class Item extends React.Component {
  constructor(props){
    super(props);
  }

  onPress = () => {
    WebBrowser.openBrowserAsync(this.props.url);
  }

  onLongPress = () => {

    Alert.alert(`${this.props.title}`, `${this.props.rootURL + this.props.path}\n\n${this.props.url} `, [
      {text: "Ok", style: "cancel"}
    ]);
  }

  render() {
    return <View style={{ flex: 1, minHeight: 50, flexDirection: 'row'}}>

      <TouchableOpacity onPress={this.onPress} onLongPress={this.onLongPress} style={{ flex: 2, flexDirection: 'column'}}>
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 24}}>{this.props.title}</Text>
      </TouchableOpacity>
    </View>
  }
}
