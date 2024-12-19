// import { useState, useEffect, useRef } from "react";
// import {
//   Text,
//   View,
//   Image,
//   Dimensions,
//   StatusBar,
//   TouchableOpacity,
// } from "react-native";
// import * as Notifications from "expo-notifications";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Icon } from "react-native-paper";
// import React from "react";

// const height = Dimensions.get("screen").height;
// const width = Dimensions.get("screen").width;

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   const [notification, setNotification] = useState<
//     Notifications.Notification | undefined
//   >(undefined);
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification: any) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response: any) => {
//         console.log(response);
//       });

//     return () => {
//       notificationListener.current &&
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//       responseListener.current &&
//         Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, alignItems: "center" }}>
//       <SafeAreaView></SafeAreaView>

//       <StatusBar barStyle={"dark-content"} />
//       <View
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           flexDirection: "row",
//           width: width,
//           paddingHorizontal: 20,
//         }}
//       >
//         <View></View>
//         <TouchableOpacity>
//           <Icon source={"dots-horizontal"} size={30} />
//         </TouchableOpacity>
//       </View>
//       <View style={{}}>
//         {notification ? (
//           <View
//             style={{
//               width: 350,
//               display: "flex",
//               backgroundColor: "white",
//               shadowOpacity: 0.5,
//               shadowOffset: { height: 5, width: 4 },
//               shadowColor: "gray",
//               paddingHorizontal: 25,
//               paddingVertical: 15,
//               borderRadius: 15,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 17,
//                 color: "#5D3FD3",
//                 fontWeight: "bold",
//                 fontStyle: "italic",
//               }}
//             >
//               {notification && notification.request.content.title}{" "}
//             </Text>
//             <Text style={{ color: "gray" }}>
//               -------------------------------------------
//             </Text>
//             <View style={{ height: 20 }}></View>
//             <Text
//               style={{
//                 fontSize: 16,
//               }}
//             >
//               {notification && notification.request.content.body}
//             </Text>
//             <View
//               style={{
//                 alignSelf: "flex-end",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 10,
//                   color: "gray",
//                 }}
//               >
//                 {notification && notification.request.content.data.date}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 10,
//                   color: "gray",
//                 }}
//               >
//                 {notification && notification.request.content.data.time}
//               </Text>
//             </View>
//           </View>
//         ) : (
//           <View
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Image source={require("@/assets/images/noNote.png")} />
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: "gray",
//               }}
//             >
//               No New Notifications!
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import { View, Text, StatusBar, Dimensions, Image, ScrollView } from "react-native";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

const width=Dimensions.get('screen').width
const height=Dimensions.get('screen').height

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Add notification received listener
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // Add notification response listener
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
      });

    // Cleanup listeners on unmount
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
  <ScrollView>
    <View style={{ flex: 1, alignItems: "center" }}>
           <SafeAreaView></SafeAreaView>
       <StatusBar barStyle={"dark-content"} />
       <View
         style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: width,
          paddingHorizontal: 20,
        }}
      >
      {notification ? (
        <View
            style={{
              width: 350,
              display: "flex",
              backgroundColor: "white",
              shadowOpacity: 0.5,
              shadowOffset: { height: 5, width: 4 },
              shadowColor: "gray",
              paddingHorizontal: 25,
              paddingVertical: 15,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "#5D3FD3",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {notification && notification.request.content.title}{" "}
            </Text>
            <Text style={{ color: "gray" }}>
              -------------------------------------------
            </Text>
            <View style={{ height: 20 }}></View>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {notification && notification.request.content.body}
            </Text>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                }}
              >
                {notification && notification.request.content.data.date}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                }}
              >
                {notification && notification.request.content.data.time}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "gray",
                }}
              >
                {notification && notification.request.content.data.entries}
              </Text>
            </View>
          </View>
      ) : (
        <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require('@/assets/images/noNote.png')}/>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
              }}
            >
              No New Notifications!
            </Text>
          </View>
      )}
      </View>
    </View>
    </ScrollView>
  );
}
