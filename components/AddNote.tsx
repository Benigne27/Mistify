import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import * as Device from "expo-device";
  import * as Notifications from "expo-notifications";
  import Constants from "expo-constants";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { StatusBar } from "react-native";
  import { TextInput } from "react-native-paper";
//   import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  
  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  
  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted to get push token for push notification!"
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError("Project ID not found");
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError("Must use physical device for push notifications");
    }
  }
  
//   export const SaveNote=async(note:object)=>{
//     try {
//       const oldNotes= await AsyncStorage.getItem('allNotes')
//       const notes= oldNotes? JSON.parse(oldNotes):[]
//       notes.push(note)
      
//     } catch (error) {
//       console.error('Error found: ', error);
      
//     }
//   }
  
  export default function AddNote() {
    const [expoPushToken, setExpoPushToken] = useState("");
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then((token) => setExpoPushToken(token ?? ""))
        .catch((error: any) => setExpoPushToken(`${error}`));
    });
  
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const handleSendNotification = async () => {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: title || "No Title",
        body: body || "No Body",
  
        data: {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
      };
  
      try {
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
        const result = await response.json();
        console.log("Notification result:", result);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    };
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <StatusBar barStyle={"dark-content"} />
          <SafeAreaView></SafeAreaView>
          <TextInput
            value={title}
            onChangeText={setTitle}
            multiline
            placeholder="Title"
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 350,
              height: 50,
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 20,
              backgroundColor: "transparent",
            }}
            theme={{ roundness: 10, colors: { primary: "#5D3FD3" } }}
            underlineColor="transparent"
            underlineStyle={{ backgroundColor: "transparent" }}
          />
          <View style={{ height: 5 }}></View>
          <TextInput
            value={body}
            onChangeText={setBody}
            multiline
            placeholder="Body"
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 350,
              paddingBottom: 100,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
            theme={{ roundness: 10, colors: { primary: "#5D3FD3" } }}
            underlineColor="transparent"
            underlineStyle={{ backgroundColor: "transparent" }}
          />
          <View style={{ height: 30 }}></View>
          <TouchableOpacity
            style={{
              width: 200,
              alignSelf: "center",
              backgroundColor: "#5D3FD3",
              padding: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={handleSendNotification}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              Send Notification
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  const styles = StyleSheet.create({});
  