import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SettingItem } from './SettingItem';


export class RedirectionSettings extends React.Component {
  render() {
    return <ScrollView>
    {
      this.props.settings.urls.map((item) => {
        return <SettingItem update={this.props.update} {...item} key={item.url} />
      })
    }

    </ScrollView>;
  }
}
