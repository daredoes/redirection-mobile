import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, FileSystem } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import CategoryNavigator from "./navigation/CategoryNavigator";
import SettingsScreen from "./screens/SettingsScreen";
import { StackNavigator, DrawerNavigator } from 'react-navigation';

const defaultSettings = {
  urls: [
    {
      url: "https://daredo.es",
      filename: "daredoes.json",
      name: "DareDoes"
    }
  ]
}

const RootStackNavigator = StackNavigator(
  {
    Settings: {
      screen: SettingsScreen
    },
    Site: {
      screen: CategoryNavigator
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

downloadFiles = (settings) => {
  settings.urls.map((item) => {
    FileSystem.downloadAsync(item.url + "/data.json", FileSystem.documentDirectory + item.filename).then((fileHeader) => {
      if(fileHeader.status != 200){
        console.log("Failed");
        console.log(fileHeader);
      }
    });
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    navigator: RootStackNavigator
  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <RootNavigation navigator={this.state.navigator} settings={this.state.settings}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    FileSystem.getInfoAsync(FileSystem.documentDirectory + "settings.json").then((item) => {
      if(item.exists){
        FileSystem.readAsStringAsync(FileSystem.documentDirectory + "settings.json").then((item) => {
          the_settings = JSON.parse(item);
          downloadFiles(the_settings);
          this.setState({
              settings: the_settings
            });
          });

      }
      else {
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "settings.json", JSON.stringify(defaultSettings, null, 4));
        downloadFiles(defaultSettings);
        this.setState({
            settings: defaultSettings
          });
      }
    });
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
