import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Tab4 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Tab4
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
});