import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image, SafeAreaView,ImageBackground,ScrollView,StatusBar} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress/Circle';
import TesseractOcr, {
    LANG_ENGLISH,
    useEventListener,
} from 'react-native-tesseract-ocr';

import * as Progress from 'react-native-progress';


const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
    cropping: true,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WITH,
};

function OCR({navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);
    const [text, setText] = useState('');

    const [isComplete, setIsComplete] = useState(true);
    const [ispProcessStart, setIspProcessStart] = useState(null);


    const [ingredientList, ingredientListSet] = React.useState([]);


    useEventListener('onProgressChange', (p) => {
        setProgress(p.percent / 100);
    });

    const recognizeTextFromImage = async (path) => {
        setIsLoading(true);



        try {
            const tesseractOptions = {};
            const recognizedText = await TesseractOcr.recognize(
                path,
                LANG_ENGLISH,
                tesseractOptions,
            );
            setText(recognizedText);

            // ======
            //
            // var array = text.split(" ");
            //
            // console.log(array);
            //
            // checkIngredient(array);

            // =======

        } catch (err) {
            console.error(err);
            setText('');
        }


        setIsLoading(false);
        setProgress(0);
    };
    // const tesseractOptions = {

    // };
    const recognizeFromPicker = async (options = defaultPickerOptions) => {
        try {
            const image = await ImagePicker.openPicker(options);
            setImgSrc({uri: image.path});
            await recognizeTextFromImage(image.path);


        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err);
            }
        }
    };

    const recognizeFromCamera = async (options = defaultPickerOptions) => {
        try {
            const image = await ImagePicker.openCamera(options);
            setImgSrc({uri: image.path});
            await recognizeTextFromImage(image.path);
        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err);
            }
        }
    };



    function processDelay (){
        setTimeout(function() {
            setIsComplete(false)
        }, 5000);
    }


    const checkIngredient = async (ingredientArray) => {
        // fetch('/api/getsome')
        //     .then(response => response.json())

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredientArray: ingredientArray })
        };

        await fetch(`https://healthyfoodssabra.herokuapp.com/api/check`,requestOptions)
            // http://192.168.8.100:8080/api/products
            .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');

                    const data = isJson && await response.json();


                    const testarray = ["a","s","as"]

                    ingredientListSet(data);

                    // console.log(data)
                    // return data;

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    // this.setState({ postId: data.id })
                }
            ).catch(function (error) {
                console.log(error);
            })
    }

// =======================================================================


    return (

        // <View style={styles.bgcontainer}>
        //     <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.bgimage}>

                <View style={styles.container}>
                    <View style={styles.bgcontainer}>
                        <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.bgimage}>
                            <View style={{flex:1}}>
                                <Text style={styles.titleText}>Search by Image</Text>
                            </View>

                            <View style={{flex:4}}>


                                <Text style={styles.title}>Healthy Foods</Text>
                                <Text style={{fontSize:8, textAlign:"center", marginHorizontal:70}}>Take an image from Camera or Upload an image from your Gallery which includes ingredients you need to test.</Text>
                                <View style={styles.options}>
                                    <View style={styles.button}>
                                        <Button
                                            color="#107E7DFF"
                                            disabled={isLoading}
                                            title="Camera"
                                            onPress={() => {
                                                recognizeFromCamera();
                                            }}
                                        />
                                    </View>
                                    <Text style={{marginTop:5}}>OR</Text>
                                    <View style={styles.button}>
                                        <Button
                                            color="#107E7DFF"
                                            disabled={isLoading}
                                            title="Gallery"
                                            onPress={() => {
                                                recognizeFromPicker();
                                            }}
                                        />
                                    </View>
                                </View>
                                {imgSrc && (
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.image} source={imgSrc} />
                                        {isLoading ? (
                                            <ProgressCircle showsText progress={progress} />
                                        ) : (
                                            <SafeAreaView style={{height:80, width:"50%"}}>
                                                <ScrollView style={styles.scrollView}>
                                                    <Text style={styles.text}>
                                                        {text}
                                                    </Text>
                                                </ScrollView>
                                            </SafeAreaView>
                                            // <Text></Text>

                                        )}
                                    </View>

                                )}
                                <View style={styles.button}>
                                    {/*<Button*/}
                                    {/*    disabled={isLoading}*/}
                                    {/*    title="Check"*/}
                                    {/*    onPress={() => {*/}

                                    {/*        var array = text.split(" ");*/}


                                    {/*        var arraytest = ["HA", "HB","UA","A", "B", "UB", "UC","HC","HD","HE","UC","UD","UE", "UKA","HKD","HKE","HKC"]*/}
                                    {/*        checkIngredient(arraytest);*/}

                                    {/*        console.log(arraytest);*/}

                                    {/*        navigation.navigate('Results')*/}

                                    {/*    }}*/}
                                    {/*/>*/}
                                    <View style={{alignItems:"center"}}>
                                        {/*<Text style={{fontSize:8, textAlign:"center", marginHorizontal:70}}>Process your data.</Text>*/}

                                        {/*<View style={{marginTop:10,width:200,marginBottom:10}}>*/}
                                        {/*    <Button*/}

                                        {/*        disabled={isLoading}*/}
                                        {/*        title="Process"*/}
                                        {/*        onPress={() => {*/}
                                        {/*            // var arraytest = ["HA", "HB","UA","A", "B", "UB", "UC","HC","HD","HE","UC","UD","UE", "UKA","HKD","HKE","HKC"]*/}

                                        {/*            setIspProcessStart(true)*/}
                                        {/*            processDelay();*/}

                                        {/*            var dataFromLabel = text.toLowerCase();*/}

                                        {/*            // var array = dataFromLabel.split(/([!,?,.])/);*/}

                                        {/*            // var array = text.split(/([!,?,.])/);*/}

                                        {/*            // ====*/}
                                        {/*            var array = dataFromLabel.split(/([!,?,.])/);*/}

                                        {/*            console.log(array);*/}


                                        {/*            var newarray=[];*/}

                                        {/*            var arrayLength = array.length;*/}
                                        {/*            for (var i = 0; i < arrayLength; i++) {*/}
                                        {/*                newarray.push(array[i].trim())*/}
                                        {/*            }*/}

                                        {/*            // ====*/}

                                        {/*            console.log(newarray);*/}

                                        {/*            checkIngredient(newarray);*/}



                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</View>*/}




                                        {!ispProcessStart && (
                                            <View style={styles.imageContainer} style={{alignItems:'center'}}>
                                                {!isComplete ? (
                                                    // <Progress.CircleSnail color={['red', 'green', 'blue']} />
                                                    <Text>asd</Text>
                                                ) : (
                                                    <View>
                                                        <Text style={{fontSize:8, textAlign:"center", marginHorizontal:70}}>Process your data.</Text>

                                                        <View style={{marginTop:5,marginBottom:10}}>
                                                            <Button

                                                                disabled={isLoading}
                                                                title="Process"
                                                                onPress={() => {
                                                                    // var arraytest = ["HA", "HB","UA","A", "B", "UB", "UC","HC","HD","HE","UC","UD","UE", "UKA","HKD","HKE","HKC"]

                                                                    setIspProcessStart(true)
                                                                    processDelay();

                                                                    var dataFromLabel = text.toLowerCase();

                                                                    // var array = dataFromLabel.split(/([!,?,.])/);

                                                                    // var array = text.split(/([!,?,.])/);

                                                                    // ====
                                                                    var array = dataFromLabel.split(/([!,?,.])/);

                                                                    console.log(array);


                                                                    var newarray=[];

                                                                    var arrayLength = array.length;
                                                                    for (var i = 0; i < arrayLength; i++) {
                                                                        newarray.push(array[i].trim())
                                                                    }

                                                                    // ====

                                                                    console.log(newarray);

                                                                    checkIngredient(newarray);



                                                                }}
                                                            />
                                                        </View>
                                                    </View>


                                                )}
                                            </View>
                                        )}














                                        {ispProcessStart && (
                                            <View style={styles.imageContainer}>
                                                {isComplete ? (
                                                    <Progress.CircleSnail color={['red', 'green', 'blue']} />
                                                    // <Text>Process !</Text>
                                                ) : (

                                                    <Text style={{color:"#d5573b",fontWeight:'bold'}}>Completed your Process !</Text>

                                                )}
                                            </View>

                                        )}

                                        {/*<Text style={{fontSize:8, textAlign:"center", marginHorizontal:70,marginTop:10}}>View your Results.</Text>*/}


                                        {ispProcessStart && (
                                            <View style={styles.imageContainer}>
                                                {isComplete ? (
                                                    // <Progress.CircleSnail color={['red', 'green', 'blue']} />
                                                    <Text style={{color:"#107e7d",fontWeight:'bold'}}>Processing....</Text>
                                                ) : (
                                                    <View>
                                                        <Text style={{fontSize:8, textAlign:"center", marginHorizontal:70,marginTop:1}}>View your Results.</Text>

                                                        <View style={{marginTop:1}}>
                                                            <Button
                                                                color="#D5573B"
                                                                disabled={isLoading}
                                                                title="View Results"
                                                                onPress={() => {
                                                                    setIsComplete(true)
                                                                    setIspProcessStart(null)

                                                                    navigation.navigate('YourResult',
                                                                        ingredientList
                                                                    )

                                                                }}
                                                            />
                                                        </View>
                                                    </View>


                                                )}
                                            </View>
                                        )}





                                        {/*<View style={{width:200,marginTop:10}}>*/}
                                        {/*    <Button*/}
                                        {/*        disabled={isLoading}*/}
                                        {/*        title="View Results"*/}
                                        {/*        onPress={() => {*/}
                                        {/*            setIsComplete(true)*/}
                                        {/*            setIspProcessStart(null)*/}

                                        {/*            navigation.navigate('YourResult',*/}
                                        {/*                ingredientList*/}
                                        {/*            )*/}

                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</View>*/}



                                        {/*<View style={{width:200,marginTop:10}}>*/}
                                        {/*    <Button*/}
                                        {/*        disabled={isLoading}*/}
                                        {/*        title="Search"*/}
                                        {/*        onPress={() => {*/}

                                        {/*            navigation.navigate('SearchOption'*/}
                                        {/*            )*/}

                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</View>*/}

                                    </View>



                                </View>
                            </View>

                            <View style={{flex:2}}>
                            </View>
                        </ImageBackground>
                    </View>


                </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    button: {
        marginHorizontal: 60,

    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginVertical: 15,
        height: DEFAULT_HEIGHT / 3.5,
        width: DEFAULT_WITH / 3.5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bgcontainer: {
        flex: 1,
    },
    bgimage: {
        flex: 1,
        justifyContent: "center"
    },
    titleText:{
        flex:1,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    scrollContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: '#2b2d42',
        marginHorizontal: 10,
    },
    text: {
        paddingVertical:4,
        paddingHorizontal:10,
        fontSize: 8,
        color:"white"
    },

});

export default OCR;
