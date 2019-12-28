import React from 'react';
import { Dimensions, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

function Item({ item, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { item, navigation })}>
      <Text
        style={{
          width: width * 10,
          paddingVertical: 10,
          fontSize: 16,
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          fontSize: 16,
          lineHeight: 41,
          paddingLeft: 20,
          backgroundColor: '#fff',
          color: '#aaa',
        }}
      >
        {item.time}
      </Text>
    </TouchableOpacity>
  );
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: require('../videos/videos.json'),
    };
  }

  render() {
    const { header, headerIcon, headerText, mainContent } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={header}>
          <FontAwesome5 name={'play'} style={headerIcon} />
          <Text style={headerText}>Video Player</Text>
        </View>
        <View style={mainContent}>
          <FlatList
            style={{ width: width - 30 }}
            data={this.state.data.videos}
            renderItem={({ item }) => <Item item={item} navigation={this.props.navigation} />}
            keyExtractor={item => 'number' + item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#aaaaff',
    flexDirection: 'row',
  },
  headerIcon: { color: '#fff', fontSize: 18, paddingRight: 10 },
  headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
});

export { HomeScreen };
