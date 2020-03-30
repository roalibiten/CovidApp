import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Dimensions, StatusBar, Image, ActivityIndicator } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
export default class WorldScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalCases: "",
            activeCases: "",
            newCases: "",
            criticalCases: "",
            recoveredCases: "",

            allDeaths: "",
            newDeaths: "",

        };
    }





    calculateAll() {
        const data = this.state.data;
        //console.log(data)
        var countryName = "";
        for (var x in data) {
            // console.log((JSON.stringify(data[x].country)));
            if (JSON.stringify(data[x].country) == '"All"') {
                //  console.log("catch")
                //console.log("all total:" + JSON.stringify(data[x]))
                this.setState({
                    totalCases: data[x].cases.total,
                    activeCases: data[x].cases.active,
                    newCases: data[x].cases.new,
                    criticalCases: data[x].cases.critical,
                    recoveredCases: data[x].cases.recovered,

                    allDeaths: data[x].deaths.total,
                    newDeaths: data[x].deaths.new,


                })
            }
            //console.log(allCases);

        }
    }
    getData() {
        var data = null;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // console.log(JSON.parse(this.response));
                if (JSON.parse(this.response).response !== self.state.data) {
                    self.setState({
                        data: JSON.parse(this.response).response
                    });
                }

                //self.dataMap(this.responseText);
                self.calculateAll();

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
        setInterval(() => { this.getData(); }, 30000);

    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" />
                <SafeAreaView style={{ flex: 1 }}  >

                    <View style={styles.safeContainer}>
                        <View style={styles.firstRow}>
                            <View style={styles.ImageLoc}>
                                <Image source={require('../assets/world.png')} style={styles.worldImage} />
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>COVID-19</Text>
                                <Text style={styles.subtitleText}>World Statistics</Text>

                            </View>
                        </View>


                        <View style={styles.secondRow}>

                            <View style={styles.column1}>
                                {this.state.newCases == "" && this.state.totalCases == "" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "50%" }}>
                                        <ActivityIndicator size={30} color="red" />
                                    </View>
                                    :
                                    <View>
                                        <Text style={[styles.caseNumber, { color: "yellow" }]}>
                                            {this.state.totalCases}
                                        </Text>
                                        <Text style={[styles.caseNumber, { color: "yellow", fontSize: 12 }]}>
                                            (today {this.state.newCases})
                                    </Text>
                                    </View>

                                }

                                <View style={styles.comunTitle}>
                                    <Text style={styles.caseTitle}>
                                        Total Cases
                                </Text>
                                </View>

                            </View>

                            <View style={styles.column2}>
                                {this.state.recoveredCases == "" && this.state.totalCases == "" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "50%" }}>
                                        <ActivityIndicator size={30} color="red" />
                                    </View>
                                    :
                                    <View>
                                        <Text style={[styles.caseNumber, { color: "#4FFF27" }]}>
                                            {this.state.recoveredCases}

                                        </Text>
                                        <Text style={[styles.caseNumber, { color: "white", fontSize: 15 }]}>
                                            %{(((parseInt(this.state.recoveredCases) * 100) / parseInt(this.state.totalCases)).toString()).substring(0, 4)}


                                        </Text>
                                    </View>
                                }

                                <Text style={styles.caseTitle}>
                                    Total Recovered

                                </Text>


                            </View>
                            <View style={styles.column3}>
                                {this.state.allDeaths == "" && this.state.newDeaths == "" && this.state.totalCases == "" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "50%" }}>
                                        <ActivityIndicator size={30} color="red" />
                                    </View>
                                    :
                                    <View>

                                        <Text style={[styles.caseNumber, { color: "red" }]}>
                                            {this.state.allDeaths}

                                        </Text>
                                        <Text style={[styles.caseNumber, { color: "yellow", fontSize: 12 }]}>
                                            (today {this.state.newDeaths})
                                </Text>
                                        <Text style={[styles.caseNumber, { color: "white", fontSize: 15 }]}>
                                            %{(((parseInt(this.state.allDeaths) * 100) / parseInt(this.state.totalCases)).toString()).substring(0, 4)}


                                        </Text>
                                    </View>
                                }
                                <Text style={styles.caseTitle}>
                                    Total Deaths

                                </Text>


                            </View>
                        </View>
                        <View style={styles.thirtRow}>
                            <View style={[styles.column1, { marginRight: screenWidth / 10 }]}>
                                {this.state.activeCases == "" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "50%" }}>
                                        <ActivityIndicator size={30} color="red" />
                                    </View>
                                    :
                                    <View>
                                        <Text style={[styles.caseNumber, { color: "yellow" }]}>
                                            {this.state.activeCases}

                                        </Text>

                                    </View>
                                }
                                <Text style={styles.caseTitle}>
                                    Active Cases

                                </Text>



                            </View>
                            <View style={styles.column1}>
                                {this.state.criticalCases == "" ?
                                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: "50%" }}>
                                        <ActivityIndicator size={30} color="red" />
                                    </View>
                                    :
                                    <View>
                                        <Text style={[styles.caseNumber, { color: "red" }]}>
                                            {this.state.criticalCases}

                                        </Text>

                                    </View>
                                }

                                <Text style={styles.caseTitle}>
                                    Critical Cases

                            </Text>

                            </View>

                        </View>
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
    worldImage: {
        width: screenWidth / 2,
        height: screenWidth / 2,
    },
    ImageLoc: {
        top: screenHeight / 30,
        left: screenHeight / 30,
        flex: 1,
    },
    firstRow: {
        width: screenWidth,
        flexDirection: "row",
        height: screenHeight / 2.7
    },
    title: {

        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: screenWidth / 10,
        paddingLeft: screenWidth / 10

    },
    titleText: {

        color: "#4FFF27",
        fontSize: 20,
        fontFamily: "Hacked-KerX",

        //top: screenWidth / 10

    },
    subtitleText: {

        color: "white",
        fontFamily: "TrenchThin-aZ1J",
        fontSize: 22,


        //top: screenWidth / 10

    },
    secondRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    thirtRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"

    },
    column1: {
        width: screenWidth / 3.4,
        height: screenWidth / 3,

        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: screenWidth / 5,
        backgroundColor: "#282828",
        marginLeft: 10,



        borderRadius: screenWidth / 20,


    },
    column2: {
        width: screenWidth / 3.4,
        height: screenWidth / 3,

        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: screenWidth / 5,
        backgroundColor: "#282828",
        marginLeft: 10,
        marginRight: 10,

        borderRadius: screenWidth / 20

    },
    column3: {
        width: screenWidth / 3.5,
        height: screenWidth / 3,

        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: screenWidth / 5,
        backgroundColor: "#282828",

        marginRight: 10,

        borderRadius: screenWidth / 20,

    },
    caseTitle: {
        color: "white",
        borderTopWidth: 1,
        borderColor: "#757575",
        paddingTop: 5,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "TrenchThin-aZ1J",
        fontSize: 15,



    },
    caseNumber: {
        color: "white",
        fontSize: 20,
        marginTop: 2
    },



})
