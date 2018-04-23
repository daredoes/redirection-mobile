import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, TouchableHighlight, Button, StyleSheet, Switch } from 'react-native';
import Category from './Category';
import Item from "./Item";
import {Constants} from 'expo';

export default class CategoryView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      active: "",
      mode: "copy"
    }
  }

  setData = (key) => {
    this.setState({
      data: this.props.items[key],
      active: key
    });
  }

  switchModes = () => {
    this.setState({
      mode: this.state.mode == "copy" ? "visit" : "copy"
    });
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
        this.props.reload(this.props.item, true);
      }}>
        <Text style={styles.backButtonText}>Reload</Text>
      </TouchableHighlight>
    </View>
    { this.props.item.name ? <ScrollView horizontal={true} style={styles.horizontalScrollBox}>
      {Object.keys(this.props.items).map((item) =>
        <Button color={this.state.active == item ? "blue" : "cyan"} key={item} title={item} onPress={() => {
          this.setData(item);

        }}/>
      )}
      </ScrollView> : <View style={styles.scrollBox}><Text style={{textAlign: "center", justifyContent: "center"}}>Loading...</Text></View> }
    { this.props.item.name ? <ScrollView style={styles.scrollBox}>
      {this.state.data.map((item) =>
        <Item style={{ flex: 1 }} state={this.state.mode} rootURL={this.props.item.url} key={item.title} {...item} />
      )}
      </ScrollView> : <View style={styles.scrollBox}><Text style={{textAlign: "center", justifyContent: "center"}}>Loading...</Text></View> }
      <View style={{ bottom: 0, height: 50, backgroundColor: 'grey', flexDirection: 'row'}}>
        <View style={{ flex: 1}}/>
        <View style={styles.toggleButton}>
          <Text style={styles.toggleText}>Copy</Text>
          <Switch style={styles.toggleSwitch} value={this.state.mode == "copy" ? false : true} onValueChange={this.switchModes} />
          <Text style={styles.toggleText}>Visit</Text>
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
    height: 425
  },

  horizontalScrollBox: {
    height: 50
  },

  toggleSwitch: {
    flex: 1
  }
});
