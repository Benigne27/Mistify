import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "../app/Context/ContextProv";


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
export default function HumidData({
  humidity,
  temperature,
  time,
  date,
  rain,
}:any) {
  const { humidityData } = useAppContext();
  const todayTime = new Date().toLocaleString();
  const todayDate = new Date().toISOString().split("T")[0];
  console.log(todayDate);
  const todayHumData = humidityData.filter((data) => data.date === todayDate);

  return (
    <View>
      <View style={styles.HumidDataTab}>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{display:'flex', gap:5}}>
            <Text style={styles.DateTime}>{date}</Text>
            <Text style={styles.DateTime}>{time}</Text>
          </View>
          <View style={{display:'flex', gap:3}}>
          <Text style={styles.Emoji2}>{rain>0?(<Text>🌧️</Text>):(<Text>⛅</Text>)}</Text>
            <Text style={styles.DateTime}>{humidity}%</Text>
            <Text style={styles.DateTime}>{temperature}°C</Text>
            <Text style={styles.DateTime}>{rain>0?(<Text>Possible rain</Text>):null}</Text>
            
          </View>
        </View>
        <View style={{ height: 20 }}></View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {todayHumData
            ? todayHumData.map((data, index) => (
                <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    key={index}
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <Text style={styles.CondData}>{data.time}</Text>
                    <Text style={styles.Emoji}>{data.rain>0?(<Text>🌧️</Text>):(<Text>⛅</Text>)}</Text>
                    <Text style={styles.CondData}>{data.humidity}%</Text>
                    <Text style={styles.CondData}>{data.temperature}°C</Text>
                    <Text style={styles.CondData}>{data.rain>0?(<Text>Possible rain</Text>):null}</Text>
           
                  </View>
                  <View style={{ width: 30 }}></View>
                </View>
              ))
            : null}
        </ScrollView>
      </View>
      <View style={{ height: 10 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  HumidDataTab: {
    width: width - 40,
    // height: 200,
    backgroundColor: "#048c",
    borderRadius: 20,
    padding: 17,
    display: "flex",
    // flexDirection:'row',
    justifyContent: "space-between",
  },
  DateTime: {
    fontSize: 18,
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  Emoji: {
    fontSize: 30,
  },
  Emoji2: {
    fontSize: 50,
  },
  CondData: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
});
