import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Clipboard, Alert, Platform, ToastAndroid } from 'react-native';
import {WebBrowser} from 'expo';

export default class Item extends React.Component {
  constructor(props){
    super(props);
  }

  onPress = () => {
    if(this.props.state == "copy"){
      this.copy();
    }
    else{
      WebBrowser.openBrowserAsync(this.props.url);
    }
  }

  copy = () => {
    Clipboard.setString(`${this.props.rootURL + this.props.path}`);
    if(Platform.OS == "android"){
      ToastAndroid.show(`Copied ${this.props.rootURL + this.props.path} to clipboard.`, ToastAndroid.SHORT);
    }
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
