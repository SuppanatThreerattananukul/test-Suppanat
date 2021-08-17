import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    Button,
    StatusBar,
    View,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from 'react-native'

const { width, height } = Dimensions.get('window');
class Login extends Component {
    constructor() {
        super();
    }
    state = {
        username: '',
        password: '',
        disabled: true,
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        if(this.state.username != '' && this.state.password != ''){
            this.setState({
                disabled: false
            })
        }else {
            this.setState({
                disabled: true
            })
        }
      }
    
    login = () => {
        this.props.navigation.navigate('home')
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
                            <View >
                                <Image style={{ alignSelf: 'center', width: 120, height: 120, marginTop: 30 }}
                                    source={require('../asset/image/logoLivingOs.png')}
                                />
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#696969' }}>Login</Text>
                                </View>
                            </View>
                            <View >
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder='username'
                                        value={this.state.username}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'username')}
                                        style={styles.input}
                                        keyboardType={'email-address'}
                                    />

                                    <TextInput
                                        placeholder='password'
                                        value={this.state.password}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                                        style={styles.input}
                                        secureTextEntry
                                        autoCorrect={false}
                                        returnKeyType='go'
                                    />

                                </View>
                            </View>
                            <View style={styles.bottom}>
                                
                                <View style={{ width: "95%", marginTop: 30, }}>
                                    <Button
                                        title="Login"
                                        color="#841584"
                                        disabled={this.state.disabled}
                                        onPress={this.login}
                                    />
                                      
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#EAEDED",
        paddingLeft: 10,
        color: 'black',
        height: height / 15,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        marginStart: 20
    }
});

export default Login;