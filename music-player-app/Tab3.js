import React from 'react';
import {Text, View, StyleSheet} from 'react-native';


export default class Tab3 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Tab3
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});