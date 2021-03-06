import React, {useState} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
    ImageBackground,
    Alert,
} from 'react-native';
import * as Progress from 'react-native-progress';

export default class Screen extends React.Component {

    render() {


        var connection = false;
        const Item = ({ item, backgroundColor, textColor }) => (


            <TouchableOpacity
                // onPress={onPress}
                onPress={()=>
                {Alert.alert(item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)+"",""+item.description)}}
                              style={{
                                  // flex: 1,
                                  marginTop:"3%",
                                  alignSelf: 'center',
                                  width: "47%",
                                  // height: 37,
                                  paddingLeft:10,
                                  paddingRight:10,
                                  paddingTop:10,
                                  paddingBottom:10,
                                  backgroundColor: item.status ==="Healthy"? "#107e7d" : item.status ==="Unhealthy"? "#d5573b" : "#e3b505",
                                  borderRadius:10,
                                  shadowColor: "#0090ff",
                                  shadowOffset: {
                                      width: 0,
                                      height: 5,
                                  },
                                  shadowOpacity: 0.34,
                                  shadowRadius: 6.27,

                                  elevation: 10,
                              }}

            >


                <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.ingredientName.charAt(0).toUpperCase() + item.ingredientName.slice(1)} is {item.status ==="Healthy"? "Safe":item.status ==="Unhealthy"? "Risky":"Unknown"}</Text>


            </TouchableOpacity>
        );


        const text =  this.props.navigation.state.params
        console.log(text)

        let IngredientData = text;


        if(IngredientData.length==0){
            connection=true
        }


        let printStatus = 'Safe';
        let countAll=0;
        let countUnhealthy=0;
        let countHealthy=0;
        let countUnknown=0;
        let avg=0;
        let color='rgb(16,126,125)'
        let avgnum=0;

        {IngredientData.map((data, key) => {
            countAll++;
            if (data.status=='Unknown'){
                countUnknown++;

            }
            if (data.status=='Healthy'){
                countHealthy++;

            }
            if (data.status=='Unhealthy'){
                countUnhealthy++;

            }
            avg=countUnhealthy/(countAll-countUnknown)
            if(avg>0.5){
                color='rgb(213,87,59)'
                printStatus = 'Risky'
            }
            avgnum=Math.round(avg*100);

        })}

        const App = () => {
            const [selectedId, setSelectedId] = useState(null);

            const renderItem = ({ item }) => {
                const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
                const color = item.id === selectedId ? 'white' : 'black';

                return (
                    <Item
                        item={item}
                        textColor={{ color }}
                    />
                );
            };

            return (
                <View style={styles.bgcontainer}>
                    <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.image}>
                        <Text style={styles.titleText}>Your Results</Text>

                        <View style={{flex:7}}>
                            <SafeAreaView>

                                <View style={{alignItems:"center", marginTop:20, marginBottom:10}}>
                                    <Text style={{fontSize:30,fontWeight:"bold",color:printStatus ==="Safe"? "#107e7d" :"#d5573b"}}>{printStatus}</Text>
                                </View>
                                <View style={{alignItems:"center"}}>
                                    <Progress.Pie progress={avg} size={100} showsText={true} duration={100} color={color}/>
                                </View>
                                <View style={{alignItems:"center", marginTop:10, marginBottom:10}}>
                                    <Text style={{fontSize:10,fontWeight:"bold",alignItems:"center"}}>{avgnum}% Ingredients Risky</Text>
                                    <Text style={{fontSize:10,alignItems:"center",width:"50%",textAlign:"center"}}>These data results may represent only long term usage or overuse.
                                    </Text>
                                </View>

                                {connection && (
                                    <View style={{alignItems:'center'}} >
                                        <Text style={{color:"#d5573b",fontWeight:'bold', fontSize:30,textAlign:'center'}}>Sorry, I can't identify your processed data</Text>

                                        <Text style={{color:"#d5573b",fontWeight:'bold', fontSize:30,textAlign:'center'}}></Text>

                                        <Text style={{color:"#d5573b",fontWeight:'bold', fontSize:30,textAlign:'center'}}>Please check your internet connection !</Text>



                                    </View>

                                )}
                                <FlatList
                                    style={{height:"47%"}}
                                    data={IngredientData}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item._id}
                                    extraData={selectedId}
                                />

                            </SafeAreaView>
                        </View>
                        <View style={{flex:1}}>
                        </View>

                    </ImageBackground>
                </View>

            );
        };

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                height:50,
                marginTop: StatusBar.currentHeight || 0,
            },
            item: {
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            },
            status: {
                fontSize: 20,
                fontWeight:"bold",
                textAlign:"center"
            },
            bgcontainer: {
                flex: 1,
            },
            image: {
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
        });

        return (
            <App/>
        )
    }
}
