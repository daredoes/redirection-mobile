import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, TouchableHighlight, Button, StyleSheet } from 'react-native';
import Category from './Category';
import {Constants} from 'expo';

export default class CategoryView extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return <View style={{paddingTop: Constants.statusBarHeight}}>
    <View style={{flexDirection: "row", height: 50}}>
      <TouchableHighlight style={styles.backButton} onPress={() => {
        this.props.navigate("Settings");
      }}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableHighlight>
      <Text style={styles.siteName}>{this.props.item.name ? this.props.item.name : "Loading..."}</Text>
      <TouchableHighlight style={styles.backButton} onPress={() => {
        this.props.navigate("Settings");
      }}>
        <Text style={styles.backButtonText}>Reload</Text>
      </TouchableHighlight>
    </View>
    { this.props.item.name ? <ScrollView style={styles.scrollBox}>
      {Object.keys(this.props.items).map((item) =>
        <Category title={item} items={this.props.items[item]} key={item} url={this.props.item.url}/>
      )}
      </ScrollView> : <View style={styles.scrollBox}><Text style={{textAlign: "center", justifyContent: "center"}}>Loading...</Text></View> }
      <View style={{ bottom: 0, height: 50, backgroundColor: 'grey', flexDirection: 'row'}}>
        <View style={{ flex: 1}}/>
        <View style={styles.toggleButton}>
          <Text style={styles.toggleText}>Copy</Text>
          <Button style={{flex: 1}} title="Toggle" onPress={() => {}} />
          <Text style={styles.toggleText}>Copy</Text>
        </View>
        <View style={{ flex: 1}}/>
      </View>
    </View>;
  }
}

var styles = StyleSheet.create({
  backButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  backButtonText: {
    textAlign: "center",
    color: "black"
  },

  siteName: {
    fontSize: 36,
    textAlign: "center",
    flex: 2
  },
  toggleButton: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  toggleText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    flex: 1
  },

  scrollBox: {
    height: 475
  }
});
