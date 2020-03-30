import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, StatusBar, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'


export default class CountriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            components: [],
            objects: []


        };
    }



    dataMap = data => {
        // console.log(data);
        var myArray = [];
        var item = "";
        const myObject = JSON.parse(data).response;
        console.log(myObject[0])
        //  console.log(myObject);
        for (var x in myObject) {
            if (myObject[x].country !== "All") {

                /* item = (
                     <View style={styles.item}>
                         <Text style={styles.countryText}>{myObject[x].country}  </Text>
                     </View>
                 )
                 myArray.push(item)*/

                item = {
                    country: myObject[x].country,
                    totalCases: myObject[x].cases.total,
                    activeCases: myObject[x].cases.active,
                    criticalCases: myObject[x].cases.critical,
                    newCases: myObject[x].cases.new,
                    totalDeaths: myObject[x].deaths.total,
                    newDeaths: myObject[x].deaths.new,
                    recovered: myObject[x].cases.recovered,

                }
                //console.log(item)
                myArray.push(item);
            }
        }
        var holder = "";
        for (var x in myArray) {
            for (var y in myArray) {
                if (myArray[y].totalCases > myArray[x].totalCases) {
                    holder = myArray[x];
                    myArray[x] = myArray[y];
                    myArray[y] = holder;
                }
            }
        }

        //console.log("HAAY" + JSON.stringify(myArray.length))

        /* this.setState({
             components: myArray
         })*/
        var component = "";
        var myCompArr = [];
        for (var x in myArray) {
            var y = myArray.length - x - 1;
            console.log("AJSNDLFANSLDFKMALS" + JSON.stringify(myArray[y]));
            component = (
                <View style={styles.item}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>{parseInt(x) + 1}  </Text>
                    </View>
                    <View style={styles.country}>
                        <Text style={styles.countryText}>{myArray[y].country}  </Text>
                    </View>
                    <View style={styles.cases}>
                        <Text style={styles.casesText}>{(myArray[y].totalCases)}  </Text>
                    </View>
                    <View style={styles.recovered}>
                        <Text style={styles.recoveredText}>{myArray[y].recovered}  </Text>
                        <Text style={[styles.recoveredText, { color: "white" }]}>
                            %{(((parseInt(myArray[y].recovered) * 100) / parseInt(myArray[y].totalCases)).toString()).substring(0, 4)}
                        </Text>

                    </View>
                    <View style={styles.deaths}>
                        <Text style={styles.deathsText}>{myArray[y].totalDeaths}  </Text>
                        <Text style={[styles.recoveredText, { color: "white" }]}>
                            %{(((parseInt(myArray[y].totalDeaths) * 100) / parseInt(myArray[y].totalCases)).toString()).substring(0, 4)}
                        </Text>

                    </View>


                </View>
            )
            myCompArr.push(component);



        }
        this.setState({
            components: myCompArr
        })

    }
    getData() {
        var data = null;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(JSON.parse(this.response));
                if (JSON.parse(this.response).response !== self.state.data) {
                    self.setState({
                        data: JSON.parse(this.response).response
                    });
                }

                self.dataMap(this.response);

            }
        });
        xhr.open("GET", "https://covid-193.p.rapidapi.com/statistics");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-rapidapi-host", "covid-193.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "39cc2d8d49mshf3777582c7242abp13ec81jsna83b1ebc2ea8");

        xhr.send(data);
    }

    componentDidMount() {
        this.getData();
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" />
                <SafeAreaView style={{ flex: 1 }}  >
                    <View style={styles.safeContainer}>
                        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#282828 ", backgroundColor: "#282828", height: screenWidth / 10 }}>

                            <View style={{ flex: 2, justifyContent: "center", paddingLeft: 10 }}>
                                <Text style={{
                                    color: "white", fontFamily: "TrenchThin-aZ1J", fontSize: 15
                                }}> #  Country Name</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "white", fontFamily: "TrenchThin-aZ1J", fontSize: 15 }}>Cases</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "white", fontFamily: "TrenchThin-aZ1J", fontSize: 15 }}>Recovered</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "white", fontFamily: "TrenchThin-aZ1J", fontSize: 15 }}>Deaths</Text>
                            </View>
                        </View>
                        {this.state.components.length == 0 ?
                            <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                                <ActivityIndicator size={30} color="red" />
                            </View>
                            :
                            <ScrollView>

                                {this.state.components}

                            </ScrollView>
                        }
                        <AdMobBanner
                            adSize="fullBanner"
                            adUnitID="ca-app-pub-3242607231127743/7861465268"
                            testDevices={[AdMobBanner.simulatorId]}
                            onAdFailedToLoad={error => console.log(error)}
                        />
                    </View>

                </SafeAreaView>
            </View>
        )
    }
}
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({

    container: {
        height: screenHeight,
        backgroundColor: "black"
    },
    safeContainer: {
        backgroundColor: "black",
        borderTopColor: "#2A2A2A",
        borderTopWidth: 1,
        height: screenHeight - screenHeight / 10

    },
    item: {
        height: screenWidth / 5,
        width: screenWidth,
        alignItems: "center",
        borderBottomColor: "#3E3E3E",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        flexDirection: "row"
    },
    countryText: {
        color: "white",
        paddingLeft: 20
    },
    country: {
        flex: 2,

    },
    numberText: {
        color: "white"
    },
    number: {
        //flex: 2,
        borderRightWidth: 1,
        borderColor: "#282828",
        height: "60%",
        justifyContent: "center",


    },
    cases: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: "#282828",
        alignItems: "center",
        height: "60%",
        justifyContent: "center"


    },
    recovered: {
        flex: 1,
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: "#282828",
        height: "60%",
        justifyContent: "center"

    },
    deaths: {
        flex: 1,
        alignItems: "center",

        height: "60%",
        justifyContent: "center"

    },
    casesText: {
        color: "yellow"
    },
    recoveredText: {
        color: "#4FFF27"
    },
    deathsText: {
        color: "red"
    }

})
