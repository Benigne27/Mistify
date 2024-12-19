import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../Context/ContextProv";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const index = () => {
  const { humidityData } = useAppContext();
  console.log(humidityData);
  const todayDate = new Date().toISOString().split("T")[1].split(":")[0];
  const todayTime = new Date().toLocaleTimeString().split(":")[0];
  const todayDateTime = todayDate.split(":")[0];
  console.log(todayTime);
  const todayHumData = humidityData.filter((data) => data.date === todayDate);
  const currentHumData = humidityData.filter(
    (data) => data.time.split(":")[0] === todayTime
  );
  // console.log(todayHumData)
  console.log(currentHumData);

  const currentIndex = humidityData.findIndex(
    (data) => data.time.split(":")[0] === todayTime
  );
  const nextHumData = humidityData.slice(currentIndex + 1, currentIndex + 4);
  return (
    <ImageBackground
      style={styles.indexTab}
      source={require("@/assets/images/sky3.jpg")}
    >
      <StatusBar barStyle={"light-content"} />
      <ScrollView style={{ width: width }}>
        <View style={{ display: "flex", alignItems: "center", height: height }}>
          <SafeAreaView></SafeAreaView>
          <Text style={{ fontSize: 120 }}>🌦️</Text>
          <View style={{ height: 15 }}></View>
          {currentHumData ? (
            <View style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Current Humidity
              </Text>
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                {currentHumData[0].humidity}%
              </Text>
              <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
                T: {currentHumData[0].temperature}°C | {currentHumData[0].time}
              </Text>
            </View>
          ) : null}
          <View style={{ height: 80 }}></View>

          <View
            style={{
              // height: 150,
              width: width - 40,
              backgroundColor: "white",
              opacity: 0.9,
              borderRadius: 20,
            }}
          >
            {
              nextHumData[0].humidity>80 ? (
                <View style={{display:'flex',justifyContent:'center', padding:20,}}>
                  <Text style={{fontSize:15}}>
                    The upcoming humidity is expected to be {nextHumData[0].humidity}%.{"\n"}
                    It is advisable to turn off fans to avoid hygroscopic materials like milk
                    to absorb moisture and lead to clogging!
                  </Text>
                  <View style={{height:15}}></View>
                  <Text style={{fontSize:15}}><Text style={{fontWeight:'bold', color:'#5D3FD3', fontSize:17}}>Tip: </Text>Watch out for pests too, they love humid conditions!</Text>
                </View>
              ):(
                <View style={{display:'flex',justifyContent:'center', padding:20,}}>
                    <Text style={{fontSize:15}}>
                    No humidity rise is expected in the next hour,{"\n"}
                    All is clear. 😊{"\n\n"}
                    Have a Great Job! 😃
                    </Text>
                </View>
              )
            }
          </View>
          <View style={{ height: 50 }}></View>
          <View style={{ display: "flex", flexDirection: "row", gap: 30 }}>
            {nextHumData.slice(0).map((data, index) => (
              <View
                key={index}
                style={{
                  height: 130,
                  width: 100,
                  backgroundColor: "white",
                  opacity: 0.9,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color:"#5D3FD3" }}>{data.time}</Text>
                <Text>{data.humidity}%</Text>
                <Text>{data.temperature}°C</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  indexTab: {
    height: height,
    display: "flex",
    alignItems: "center",
  },
});
