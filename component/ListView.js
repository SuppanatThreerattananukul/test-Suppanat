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
    FlatList,
    Platform
} from 'react-native'

const { width, height } = Dimensions.get('window');
class Home extends Component {
    constructor() {
        super();
    }
    state = {
        items: [],
        itemCount: 10,
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/photos').then((response) => response.json()).then((responseJson) => {
            this.setState({
                items: responseJson
            })
        })
    }

    back = () => {
        this.props.navigation.navigate('listView')
    }


    renderItem(item, index) {
        return (
            <View style={styles.cardTemplate}>
             <Image 
               style={styles.cardImage}
               source={{ uri: item.thumbnailUrl }}
           />
           <View style={styles.textContainer}>
             <Text style={styles.cardTitle}>{item.title}</Text>
           </View>
          </View>
        )
    }

    render() {
        return (
            <SafeAreaView >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1, justifyContent: 'space-between', }}
                    onScroll={(e) => {
                        var windowHeight = Dimensions.get('window').height,
                            height = e.nativeEvent.contentSize.height,
                            offset = e.nativeEvent.contentOffset.y;
                        // console.log(windowHeight+' '+height+' '+offset)
                        if (windowHeight + offset >= height) {
                            // console.log('End Scroll')
                            this.setState(() => ({
                                itemCount: this.state.itemCount + 10,
                            }))
                        }
                    }
                    }
                    >
                    <View style={styles.container}>
                        <StatusBar
                            animated={true}
                            backgroundColor="#61dafb"
                            barStyle='dark-content'
                            showHideTransition='fade'
                            hidden={false} />
                        <FlatList
                            Vertical
                            scrollEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="center"
                            data={this.state.items.slice(0, this.state.itemCount)}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                        />
                    </View>

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
    cardTemplate:{
        width: 250,
        height: 250,
        marginTop: 20
      },
      cardImage: {
        width: 250,
        height: 250,
        borderRadius : 10,
      },
      textContainer:{
        position: "absolute",
        width: 250,
        height: 50,
        bottom:0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10
      },
      cardTitle: {
         color: "white",
    
      }
});

export default Home;