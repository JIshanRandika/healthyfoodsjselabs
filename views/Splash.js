import React, { Component } from 'react';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, Dimensions, TextInput, KeyboardAvoidingView,ImageBackground
} from 'react-native';

export default class Myapp extends Component
{

    constructor(){
        super();
        this.state={
            isVisible : true,
        }
    }
    Hide_Splash_Screen=()=>{
        this.setState({
            isVisible : false
        });
    }

    componentDidMount(){
        var that = this;
        setTimeout(function(){
            that.Hide_Splash_Screen();
        }, 5000);
    }
    static navigationOptions = {
        headerShown: false

    };

    render()
    {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        let Splash_Screen = (
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image source={require('../assets/images/splash.png')}
                           style={{width:windowWidth, height: windowHeight}} />
                </View>
            </View>

        )
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.image}>

                    <View style = { styles.MainContainer }>

                        <KeyboardAvoidingView behavior={Platform.OS == "android" } style={{flex: 6, alignItems: 'center', width: Dimensions.get('window').width}}>
                            <View style={{flex: 2,}}>
                            </View>

                            <View style={{flex: 3,}}>
                                <Image style={{
                                    width: Dimensions.get('window').width,
                                    height: Dimensions.get('window').width / 1.3
                                }} source={require('../assets/images/logo.png')}/>
                            </View>
                            {/*<View style={{flex: ,}}>*/}
                            {/*</View>*/}
                            <View style={{
                                // flex: 1,
                                alignSelf: 'center',
                                width: 170,
                                height: 50,
                                backgroundColor: "#107e7d",
                                borderRadius: 15,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 0,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,

                                elevation: 10,

                            }}>
                                <Text onPress={() => {
                                    this.props.navigation.push('Home');
                                }
                                } style={{textAlign: 'center', color: '#ffffff', fontWeight: "bold", marginTop: 3, fontSize:25}}>
                                    Start Now
                                </Text>

                            </View>
                            <View style={{flex: 2,}}>
                            </View>

                        </KeyboardAvoidingView>

                        {
                            (this.state.isVisible === true) ? Splash_Screen : null
                        }
                    </View>


                </ImageBackground>
            </View>

        );
    }
}
const styles = StyleSheet.create(
    {
        MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
            },

        SplashScreen_RootView:
            {
                justifyContent: 'center',
                flex:1,
                margin: 10,
                position: 'absolute',
                width: '100%',
                height: '100%',
            },

        SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                flex:1,
            }
        ,container: {
            flex: 1,
        },
        image: {
            flex: 1,
            justifyContent: "center"
        },
    });
