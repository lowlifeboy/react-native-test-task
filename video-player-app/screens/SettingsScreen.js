import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#aaaaff',
            flexDirection: 'row',
          }}
        >
          <FontAwesome5 name={'cog'} style={{ color: '#fff', fontSize: 20, paddingRight: 10 }} />
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Settings</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Settings Screen</Text>
        </View>
      </View>
    );
  }
}

export { SettingsScreen };
