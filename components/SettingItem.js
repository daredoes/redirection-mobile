import React from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';


export class SettingItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: this.props.url
    }
  }


  render() {
    return <View>
      <TextInput value={this.state.url} onChangeText={(text) => this.props.update('')}/>

    </View>;
  }
}
