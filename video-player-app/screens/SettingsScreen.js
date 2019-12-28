import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';

const SettingsScreen = () => {
  const { header, headerIcon, headerText, mainContent } = styles;

  return (
    <View style={{ flex: 1 }}>
      <View style={header}>
        <FontAwesome5 name={'cog'} style={headerIcon} />
        <Text style={headerText}>Settings</Text>
      </View>
      <View style={mainContent}>
        <Text>Settings Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#aaaaff',
    flexDirection: 'row',
  },
  headerIcon: { color: '#fff', fontSize: 20, paddingRight: 10 },
  headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
});

export { SettingsScreen };
