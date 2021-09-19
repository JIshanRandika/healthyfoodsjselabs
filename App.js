import React from "react";
import { createAppContainer } from 'react-navigation';
import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';

import { PermissionsAndroid, Text, Alert, StyleSheet, View } from 'react-native';



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
                "Permission Granted","This application is still under development process. We hope you valuable feedback for future improvements." +
                "\n\nYou can directly contact our developer team JSE Labs." +
                "\n\nWebsite: https://healthyfoods-jselabs.github.io/HealthyFoods.Web/" +
                "\n\nEmail: healthy.foods.susl@gmail.com" +
                "\n\nFacebook: www.facebook.com/Healthy-Foods-107676938322921" +
                "\n\nInstagram: healthyfoodssusl" +
                "\n\nYoutube: https://www.youtube.com/channel/UC_B6PoKqoY04-KbU8Iu1k6g" +
                "\n\nWhatsapp: +94715757700(Ishan)\n                     +94710642428(Charith)");
        }
        else {
            Alert.alert("Permission Not Granted","This application is still under development process. We hope you valuable feedback for future improvements." +
                "\n\nYou can directly contact our developer team JSE Labs." +
                "\n\nEmail: healthy.foods.susl@gmail.com" +
                "\nWhatsapp: +94715757700(Ishan)\n                     +94710642428(Charith)");
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
                headerTitle: <Text style={{fontSize: 18,
                    fontWeight: "bold",
                    // textAlign: "center",
                    color: "white"}}>Search by Image</Text>,
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
    render() {
        return <AppContainer />;
    }
}
