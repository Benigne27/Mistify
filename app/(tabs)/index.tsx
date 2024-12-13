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
  return (
    <ImageBackground
      style={styles.indexTab}
      source={require("@/assets/images/sky2.jpg")}
    >
      <StatusBar barStyle={"light-content"} />
      <ScrollView style={{width:width}}>
        <View style={{display:'flex', alignItems:'center', height:height}}>
      <SafeAreaView></SafeAreaView>
      <Text style={{ fontSize: 120 }}>🌦️</Text>
      <View style={{height:15}}></View>
      {currentHumData ? (
        <View style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Current Humidity
          </Text>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            {currentHumData[0].humidity}%
          </Text>
          <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
            T: {currentHumData[0].temperature}°C | {currentHumData[0].time}
          </Text>
        </View>
      ) : null}
      <View style={{height:80}}></View>
      

      <View style={{height:150, width:width-40, backgroundColor:'white', opacity:0.9, borderRadius:20}}></View>
      <View style={{height:50}}></View>
      <View style={{display:'flex', flexDirection:'row', gap:30}}>
        <View style={{height:130, width:100, backgroundColor:'white', opacity:0.9, borderRadius:20}}></View>
        <View style={{height:130, width:100, backgroundColor:'white', opacity:0.9, borderRadius:20}}></View>
        <View style={{height:130, width:100, backgroundColor:'white', opacity:0.9, borderRadius:20}}></View>
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
