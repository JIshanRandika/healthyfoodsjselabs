import React, {Component, Fragment, useState} from 'react';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, StatusBar,ImageBackground,Alert} from 'react-native';
import * as Progress from 'react-native-progress';
import SearchableDropdown from 'react-native-searchable-dropdown';

// header: { visible: false }

// const image = { uri: "https://reactjs.org/logo-og.png" };
var items = [
    {
        id: 1,
        name: 'P1',
    },
    {
        id: 2,
        name: 'P2',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];





const App = () => (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.titleText}>Quick Search Your Product</Text>
            {/*<Text style={styles.text}>Inside</Text>*/}
            {/*<Text style={styles.text}>Inside</Text>*/}
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    titleText:{
        flex:1,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    searchOption:{
        flex:2,
        alignItems:'center',
        width:'100%'
    },

    photoOption:{
        flex:2,
        // position:''

    },

    searchByImage:{
        flex:2,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: '#2b2d42',
    },

    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },

    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});

// export default App;





// ================


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts:[],
            ingredientList:[],
            newselect:'Search by Product',
            productSelected: true,
            productSeached:false,
            processStart:null,
            processComplete:true,
            selectedItems: [
                // {
                //     id: 7,
                //     name: 'Go',
                // },
                // {
                //     id: 8,
                //     name: 'Swift',
                // }
            ]
        }
    }

// ========================
    componentDidMount() {
        this.setState({isLoading: true});

        fetch('https://healthyfoodssabra.herokuapp.com/api/products')
            .then(response => response.json())
            .then(data => this.setState({allProducts: data}));

    }

// ====================

    render() {


        const processDelay = () =>{
            setTimeout(function () {
                this.setState({processComplete: false});
            }.bind(this), 2000)
        }

        const checkIngredient = async (ingredientArray) => {
            // fetch('/api/getsome')
            //     .then(response => response.json())

            console.log('ingredient Array')
            console.log(ingredientArray)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientArray: ingredientArray })
            };

            // const [newingredientList, newingredientListSet] = React.useState([]);


            await fetch(`https://healthyfoodssabra.herokuapp.com/api/check`,requestOptions)
                // https://healthyfoodssabra.herokuapp.com/api/ingredients
                // http://192.168.8.100:8080/api/products
                .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');


                        const recivedData = isJson && await response.json();

                        console.log('recivedData')
                        console.log(recivedData)

                        const testarray = ["a","s","as"]

                        // newingredientListSet(recivedData);

                        this.setState({ingredientList:recivedData})


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


        const searchProduct = async (name) => {


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchProductName: name })
            };

            await fetch(`https://healthyfoodssabra.herokuapp.com/api/product/ingredient`,requestOptions)
                .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');

                        const data = isJson && await response.json();

                        console.log(data)

                        console.log(JSON.stringify(data))

                        var array = JSON.stringify(data).split(/([!,?,."])/);

                        console.log(array)

                        checkIngredient(array)

                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            return Promise.reject(error);
                        }

                    }
                ).catch(function (error) {
                    console.log(error);
                })
        }


        const SearchOption = () => (
            <View style={styles.searchOption}>
            {/*<Fragment>*/}
            {/*    <Text>*/}
            {/*        {this.state.newselect}*/}
            {/*    </Text>*/}

                <SearchableDropdown
                    onItemSelect={(item) => {
                        console.log("testing")
                        // this.setState({productSelected:false})

                        const items = this.state.selectedItems;
                        items.push(item)
                        this.setState({newselect:item.name})
                        this.setState({ selectedItems: items });

                    }}
                    containerStyle={{ padding: 5, width: "75%" }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                        this.setState({ selectedItems: items });
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 100 }}
                    items={this.state.allProducts}
                    // defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                        {
                            placeholder: this.state.newselect,
                            underlineColorAndroid: "transparent",
                            style: {
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#592828',
                                borderRadius: 5,
                            },
                            // onTextChange: text => alert(text)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />

                {!this.state.productSeached && (
                <View style={{width:200,marginTop:10}}>
                    <Button
                        color="#107E7DFF"
                        title="Search"
                        onPress={() => {
                            this.setState({processStart:true})
                            this.setState({productSelected:false})
                            this.setState({productSeached:true})
                            // setTimeout(function() {
                            //     finished=false;
                            // }, 5000);

                            processDelay();

                            searchProduct(this.state.newselect)

                        }}
                    />
                </View>
                )}


                {this.state.processStart && (
                    <View>
                        {this.state.processComplete ? (
                            <Progress.CircleSnail color={['red', 'green', 'blue']} />
                            // <Text>Process !</Text>
                        ) : (

                            <Text style={{color:"#d5573b",fontWeight:'bold'}}>Completed your Process !</Text>

                        )}
                    </View>

                )}


                {this.state.productSeached && (
                <View style={{width:200,marginTop:10}}>
                    <Button
                        color="#D5573B"
                        title="Your Results"
                        onPress={() => {

                            this.setState({processStart:false})
                            this.setState({productSelected:true})
                            this.setState({productSeached:false})
                            this.setState({processComplete: true});

                            console.log(this.state.ingredientList)
                            this.props.navigation.push('YourResult',this.state.ingredientList)

                        }}
                    />
                </View>
                )}



            {/*</Fragment>*/}
            </View>
        );



        return (

            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.image}>
                    <Text style={styles.titleText}>Quick Search Your Product</Text>
                    <SearchOption/>

                    {this.state.productSelected && (

                            <View style={styles.photoOption}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.push('OCR');

                                    console.log(this.state.allProducts)
                                }}>
                                    <View style={{alignItems:'center'}}>
                                        <Image  style={{width:"75%",height:"100%", resizeMode:'stretch'}} source={require('../assets/images/photo.png')}/>
                                    </View>

                                </TouchableOpacity>
                            </View>




                    )}

                    {this.state.productSelected && (
                    <Text style={styles.searchByImage}>Search by Image</Text>
                    )}

                    {/*<Text style={styles.text}>Inside</Text>*/}
                </ImageBackground>
            </View>


        );

    }
}
