import React from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';


export default class App extends React.Component {
    render() {
        return (
            <Router style={styles.container}>
                <Scene key="root" tabs={true} tabBarPosition="bottom">
                    <Scene key="tab1" component={Tab1} title="Playlist"/>
                    <Scene
                        key="tab2"
                        component={Tab2}
                        hideNavBar={true}
                    />
                    <Scene key="tab3" component={Tab3} title="Screen3"/>
                    <Scene key="tab4" component={Tab4} title="Screen4"/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
