import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    Button,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Linking,
    Platform,
    Modal
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import ImageView from "react-native-image-viewing";

const { width, height } = Dimensions.get('window');
class Home extends Component {
    constructor() {
        super();
    }
    state = {
        items: [
            {
                id: 1,
                thumbnailUrl: "https://via.placeholder.com/150/771796",
                url: "https://www.thelivingos.com/",
                lat: "13.7541215",
                lng: "100.5737971",
                uri: "https://via.placeholder.com/150/771796",
            },
            {
                id: 2,
                thumbnailUrl: "https://via.placeholder.com/150/24f355",
                url: "https://www.thelivingos.com/",
                lat: "13.7541215",
                lng: "100.5737971",
                uri: "https://via.placeholder.com/150/24f355",
            },
            {
                id: 3,
                thumbnailUrl: "https://via.placeholder.com/150/f66b97",
                url: "https://www.thelivingos.com/",
                lat: "13.7541215",
                lng: "100.5737971",
                uri: "https://via.placeholder.com/150/f66b97",
            }
        ],
        visible: false,
        imageIndex: 0
    }

    logout = () => {
        this.props.navigation.navigate('login')
    }

    next = () => {
        this.props.navigation.navigate('listView')
    }

    onpress = (item) => {
        const location = item.lat + ',' + item.lng;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = location;
        const label = 'Google map';
        const urlMap = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        if (item.id === 1) {
            Linking.openURL(item.url)
        } else if (item.id === 2) {
            Linking.openURL(urlMap);
        } else if (item.id === 3) {
            this.setState({
                visible: true,
                imageIndex: item.id-1
            })
        }
    }

    renderItem({ item, index }) {
        
        return (
            <View style={styles.image}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onpress(item)}>
                    <Image style={{ width: 240, height: 240, marginTop: 30 }}
                        source={{ uri: item.thumbnailUrl }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    renderImageFull() {
        return (
            <ImageView
                images={this.state.items}
                imageIndex={this.state.imageIndex}
                visible={this.state.visible}
                onRequestClose={() => this.setState({
                    visible: false
                })}
            />
        )
    }

    render() {
        return (
            <SafeAreaView >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1, justifyContent: 'space-between', }}>
                    <View style={styles.container}>
                        <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle='dark-content'
                            showHideTransition='fade'
                            hidden={false} />
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.items}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={this.renderItem.bind(this)}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                    <View style={styles.bottom}>

                        <View style={{ width: "95%", marginTop: 30, }}>
                            <Button
                                title="Next"
                                color="#841584"
                                disabled={this.state.disabled}
                                onPress={this.next}
                            />
                        </View>

                        <View style={{ width: "95%", marginTop: 5, }}>
                            <Button
                                title="Logout"
                                color="#841584"
                                disabled={this.state.disabled}
                                onPress={this.logout}
                            />
                        </View>
                    </View>
                    {this.renderImageFull()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        marginStart: 20
    }
});

export default Home;