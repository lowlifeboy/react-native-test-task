import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Video } from 'expo-av';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ navigation }) => {
  const { header, goBackIcon, headerText, mainContent, videoName, videoAuthor } = styles;
  const { author, name, url } = navigation.getParam('item');

  return (
    <View>
      <View style={header}>
        <FontAwesome5
          name={'chevron-left'}
          style={goBackIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={headerText}>Video</Text>
      </View>
      <View style={mainContent}>
        <Video
          source={{
            uri: url,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          style={{ width: width - 20, height: 200, marginTop: 10 }}
        />
        <Text style={videoName}>{name}</Text>
        <Text style={videoAuthor}>{author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 12,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#aaaaff',
    flexDirection: 'row',
  },
  goBackIcon: { color: '#fff', fontSize: 20, paddingHorizontal: 20, marginRight: 10 },
  headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  mainContent: { justifyContent: 'center', paddingHorizontal: 10 },
  videoName: { fontSize: 20, marginTop: 3, marginBottom: 3 },
  videoAuthor: { fontSize: 14, color: '#888' },
});

export { DetailsScreen };
