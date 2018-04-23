import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Item from './Item';

export default class Category extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return <View style={{ flex: 1, flexDirection: 'column'}}>
      <View style={{ flex: 1, flexDirection: 'row', height: 30, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity style={{ flex: 1}}><Text style={{textAlign: 'center' }}>L</Text></TouchableOpacity>
      <Text style={{ fontSize: 15, flex: 2, textAlign: 'center'}}>{this.props.title}</Text>
      <TouchableOpacity style={{ flex: 1}}><Text style={{textAlign: 'center' }}>R</Text></TouchableOpacity>
      </View>
      <View style={{ flex: 1, flexDirection: 'column'}}>
      {this.props.items.map((item) => <Item style={{ flex: 1 }} rootURL={this.props.url} key={item.title} {...item} />)}
      </View>
    </View>
  }
}
