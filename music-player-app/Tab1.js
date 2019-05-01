import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';

class PlaylistItem {
    constructor(name, url, image) {
        this.name = name;
        this.url = url;
        this.image = image;
    }
}

const Playlist = [
    new PlaylistItem(
        'Comfort Fit - “Sorry”',
    ),
    new PlaylistItem(
        'Mildred Bailey – “All Of Me”',
    ),
    new PlaylistItem(
        'Podington Bear - “Rubber Robot”',
    ),
];


export default class Tab1 extends React.Component {

    Press = (index) => {
        Actions.jump('_tab2', {index: index});
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    Playlist.map((item, index) => {
                        return (
                            <TouchableHighlight
                                key={index}
                                onPress={() => this.Press(index)}
                                underlayColor='#fff'
                                >
                                <Text style={styles.item}>{item.name}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
    },
    item: {
        fontSize: 20,
        margin: 5,
    }
});