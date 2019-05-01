import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button,
} from 'react-native';
import {Audio} from 'expo';
import {AntDesign} from '@expo/vector-icons';

class PlaylistItem {
    constructor(name, uri, image) {
        this.name = name;
        this.uri = uri;
        this.image = image;
    }
}

const PLAYLIST = [
    new PlaylistItem(
        'Comfort Fit - “Sorry”',
        'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
        'https://facebook.github.io/react/img/logo_og.png'
    ),
    new PlaylistItem(
        'Mildred Bailey – “All Of Me”',
        'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
        'https://facebook.github.io/react/img/logo_og.png'
    ),
    new PlaylistItem(
        'Podington Bear - “Rubber Robot”',
        'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
        'https://facebook.github.io/react/img/logo_og.png'
    ),
];

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.index = this.props.index;
        this.playbackInstance = null;
        this.state = {
            playbackInstanceName: LOADING_STRING,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: true,
            volume: 1.0,
            rate: 1.0,
            portrait: null,
        };
    }


    componentWillMount() {
        console.log(this.props.index);
        Audio.setAudioModeAsync({
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        
        this._loadNewPlaybackInstance(true);
    }

    componentWillReceiveProps(){
        console.log(this.props.index);
        this.index = this.props.index;
        this._updateScreenForLoading(true);
        this._loadNewPlaybackInstance(true);
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }

        const source = {uri: PLAYLIST[this.index].uri};
        const initialStatus = {
            shouldPlay: playing,
        };

        const {sound, status} = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;

        this._updateScreenForLoading(false);
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true,
            });
        } else {
            this.setState({
                playbackInstanceName: PLAYLIST[this.index].name,
                portrait: PLAYLIST[this.index].image,
                isLoading: false,
            });
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                volume: status.volume,
            });
            if (status.didJustFinish) {
                this._advanceIndex(true);
                this._updatePlaybackInstanceForIndex(true);
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _advanceIndex(forward) {
        this.index =
            (this.index + (forward ? 1 : PLAYLIST.length - 1)) %
            PLAYLIST.length;
    }

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true);

        this._loadNewPlaybackInstance(playing);
    }

    _onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();
            }
        }
    };

    _onForwardPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(true);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onBackPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(false);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };


    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(
                this.state.playbackInstanceDuration
            )}`;
        }
        return '';
    }

    render() {
        return !this.state.fontLoaded ? (
            <View/>
        ) : (
            <View style={styles.container}>
                {/*<View style={styles.navBar}>*/}
                    {/*<Button*/}
                        {/*style={styles.button}*/}
                        {/*title='back'*/}
                        {/*color="#919191"*/}
                    {/*>*/}
                        {/*Back*/}
                    {/*</Button>*/}
                    {/*<Text>*/}
                        {/*{PLAYLIST[this.index].name}*/}
                    {/*</Text>*/}
                {/*</View>*/}
                <View style={styles.portraitContainer}>
                    <Image
                        style={styles.portrait}
                        source={{
                            uri: this.state.portrait,
                        }}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text>
                        {this.state.playbackInstanceName}
                    </Text>
                    <Text>
                        {this.state.isBuffering ? (
                            BUFFERING_STRING
                        ) : (
                            this._getTimestamp()
                        )}
                    </Text>
                </View>
                <View
                    style={[
                        styles.buttonsContainerBase,
                        styles.buttonsContainerTopRow,
                        {
                            opacity: this.state.isLoading
                                ? DISABLED_OPACITY
                                : 1.0,
                        },
                    ]}
                >
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onBackPressed}
                        disabled={this.state.isLoading}
                    >
                        <AntDesign name="stepbackward" size={40}/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onPlayPausePressed}
                        disabled={this.state.isLoading}
                    >
                        <View>
                            <AntDesign
                                name={this.state.isPlaying ? 'pausecircle' : 'play'}
                                size={40}
                            />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onForwardPressed}
                        disabled={this.state.isLoading}
                    >
                        <View>
                            <AntDesign name="stepforward" size={40}/>
                        </View>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
    },
    portraitContainer: {
        marginTop: 80,
    },
    portrait: {
        height: 200,
        width: 200,
    },
    detailsContainer: {
        height: 40,
        marginTop: 40,
        alignItems: 'center',
    },
    playbackContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    playbackSlider: {
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE,
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 100,
    },
    // navBar: {
    //     flexDirection: 'row',
    //     paddingTop: 40,
    //     fontSize: 18,
    //     position: 'absolute',
    // },
    // button: {
    //     fontSize: 12,
    //     marginTop: 15,
    //     marginRight: 15,
    //     paddingLeft: -40
    //
    // },
    buttonsContainerTopRow: {
        maxHeight: 40,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0,
    },
    buttonsContainerMiddleRow: {
        maxHeight: 40,
        alignSelf: 'stretch',
        paddingRight: 20,
    },
    volumeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: DEVICE_WIDTH - 40,
        maxWidth: DEVICE_WIDTH - 40,
    },
    volumeSlider: {
        width: DEVICE_WIDTH - 80,
    },
    buttonsContainerBottomRow: {
        alignSelf: 'stretch',
    },
    rateSlider: {
        width: DEVICE_WIDTH - 80,
    },
});