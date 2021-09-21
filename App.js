import React from "react";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator, HeaderBackButton,} from 'react-navigation-stack';

import {PermissionsAndroid, Text, Alert, StyleSheet, View, Button, Image, Dimensions,Linking} from 'react-native';

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import { SideMenuView } from "react-native-navigation-drawer-extension";
import Drawer from 'react-native-drawer'

export async function request_location_runtime_permission() {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.INTERNET,
            // PermissionsAndroid.PERMISSIONS.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION,


            PermissionsAndroid.PERMISSIONS.MANAGE_DOCUMENTS,
            // PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.MANAGE_MEDIA,
            PermissionsAndroid.PERMISSIONS.STORAGE,
            {
                'title': 'ReactNativeCode Permission',
                'message': 'ReactNativeCode App needs access to your location '
            }
        )





        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                "Permission Granted","Wellcome to Healthy Foods");
        }
        else {
            Alert.alert("Permission Not Granted","Wellcome to Healthy Foods");
        }
    } catch (err) {
        console.warn(err)
    }
}

import Splash from './views/Splash'
import OCR from './views/OCR'
// import Results from './views/Results'
// import ResultsView from './views/ResultsView'
import YourResult from './views/YourResult'
// import SearchOption from './views/SearchOption'
import Home from './views/Home'



const AppNavigator = createStackNavigator(
    {
        Splash:Splash,
        OCR:{
            screen:OCR,
            navigationOptions: ({navigation}) => ({
                title: '',
                headerStyle: styles.headerStyle,
                // headerTitle: <Text style={{fontSize: 18,
                //     fontWeight: "bold",
                //     // textAlign: "center",
                //     color: "white"}}>Search by Image</Text>,
                headerTintColor: 'white',
                // headerLeft : <HeaderBackButton tintColor={'white'} onPress={() => {navigation.navigate('Home')}}></HeaderBackButton>,
                headerRight: null,

            })
        },
        // SearchOption:SearchOption,
        // Results:Results,
        // ResultsView:ResultsView,
        YourResult:{
            screen:YourResult,
            navigationOptions: ({navigation}) => ({
                title: '',
                headerStyle: styles.headerStyle,
                headerTintColor: 'white',
                // headerTitle: <Text>My home</Text>,
                // headerLeft : styles.backButton,
                headerRight: null,

            })
        },
        // Headers:Header
        Home:{
            screen:Home,
            navigationOptions: ({navigation}) => ({
                title: '',
                headerStyle: styles.headerStyle,
                headerTintColor: 'white',
                // headerTitle: <Text>My home</Text>,
                // headerLeft : <HeaderBackButton  tintColor={'white'} onPress={() => {navigation.navigate('Splash')}}></HeaderBackButton>,
                headerRight: null,

            })
        }
    },
    {
        initialRouteName: "Splash"
    }
);


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#2b2d42',
        shadowColor:'#2b2d42',
    },
    backButton:{
        backgroundColor:'#ffffff',
        tintColor:'#ffffff',

    }

});


const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    async componentDidMount() {
        await request_location_runtime_permission()
    }


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //         drowerIsOpen:true,
    //
    //     }
    // }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    render() {
        return (
            <Drawer
                open={false}
                type="static"
                content={


                    <View style={{flex: 1,backgroundColor: "#2B2D42"}}>
                        <View style={{alignItems:'center'}}>
                            <Image style={{
                                width: Dimensions.get('window').width/2,
                                height: (Dimensions.get('window').width/2) / 1.3,marginTop:"50%",alignItems:'center'
                            }} source={require('./assets/images/logoWhite.png')}/>
                        </View>


                        {/*<View style={{backgroundColor: "#107e7d",padding:15,marginTop:20}}>*/}
                        {/*   */}

                        {/*</View>*/}

                        <View style={{marginTop:5}}>
                            <Button
                                color="#107e7d"
                                contentStyle={{ color: "#107e7d", fontSize: 8 }}
                                title="Website"
                                onPress={() => {
                                    Linking.openURL('https://healthyfoods-jselabs.github.io/HealthyFoods.Web/')
                                    // this._drawer.close();
                                    // this.props.navigation.push(Home);
                                }}
                            />
                        </View>

                        <View style={{marginTop:5}}>
                            <Button
                                color="#107e7d"
                                contentStyle={{ color: "#107e7d", fontSize: 8 }}
                                title="Like us on Facebook"
                                onPress={() => {
                                    Linking.openURL('https://www.facebook.com/Healthy-Foods-107676938322921')
                                    // this._drawer.close();
                                    // this.props.navigation.push(Home);
                                }}
                            />
                        </View>

                        <View style={{marginTop:5}}>
                            <Button
                                color="#107e7d"
                                contentStyle={{ color: "#107e7d", fontSize: 8 }}
                                title="Follow us On Instagram"
                                onPress={() => {
                                    Linking.openURL('https://www.instagram.com/invites/contact/?i=19oyl8liakjdb&utm_content=mq3uytq')
                                    // this._drawer.close();
                                    // this.props.navigation.push(Home);
                                }}
                            />
                        </View>


                        <View style={{marginTop:5}}>
                            <Button
                                color="#107e7d"
                                contentStyle={{ color: "#107e7d", fontSize: 8}}
                                title="Subscribe us On Yourtube"
                                onPress={() => {
                                    Linking.openURL('https://www.youtube.com/channel/UC_B6PoKqoY04-KbU8Iu1k6g')
                                    // this._drawer.close();
                                    // this.props.navigation.push(Home);
                                }}
                            />
                        </View>
                        <View style={{marginTop:5}}>
                            <Button
                                color="#107e7d"
                                contentStyle={{ color: "#107e7d", fontSize: 8}}
                                title="Contact us on WhatsApp"
                                onPress={() => {
                                    Linking.openURL('https://wa.me/+94715757700')
                                    // this._drawer.close();
                                    // this.props.navigation.push(Home);
                                }}
                            />
                        </View>
                        <Text style={{color:'white',textAlign:'center',fontSize:10,marginTop:"20%"}}>healthy.foods.susl@gmail.com</Text>

                    </View>




                }

                ref={(ref) => this._drawer = ref}
                // tapToClose={true}
                openDrawerOffset={0.45} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{color: '#000000', shadowOpacity: 0.1, shadowRadius: 3,backgroundColor: "#107e7d"}}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
            >
                <View style={{flexDirection:"row",flex:1}}>

                            <Button
                                color="#2B2D42"
                                title=""
                                onPress={() => {this._drawer.open()}}
                            />


                    <AppContainer />
                    {/*<Button*/}
                    {/*    color="#2B2D42"*/}
                    {/*    title=""*/}
                    {/*    onPress={() => {this._drawer.open()}}*/}
                    {/*/>*/}
                </View>

            </Drawer>

        );
    }
}
