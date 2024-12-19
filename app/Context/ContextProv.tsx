// import { StyleSheet, Text, View, Platform } from "react-native";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { ActivityIndicator } from "react-native";

// // Types for the weather data structure
// type HourlyData = {
//   temperature_2m: number[];
//   relative_humidity_2m: number[];
//   dew_point_2m: number[];
//   time: string[];
// };

// type WeatherApiResponse = {
//   hourly: HourlyData;
// };

// // Type for humidity data used in the context
// type HumidityData = {
//   date: string;
//   time: string;
//   humidity: number;
//   temperature: number;
//   dew_point_2m: number;
// }[];

// // Type for context value
// type AppContextType = {
//   humidityData: HumidityData;
//   apiResponses: WeatherApiResponse | null;
// };

// // Context with the defined type
// export const AppContext = createContext<AppContextType | undefined>(undefined);

// // Custom hook to use the context
// export const useAppContext = (): AppContextType => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

// // Props type for ContextProv
// type ContextProvProps = {
//   children: ReactNode;
// };

// export default function ContextProv({ children }: ContextProvProps) {
//   const [apiResponses, setApiResponses] = useState<WeatherApiResponse | null>(
//     null
//   );

//   const theLatitude = -1.9504;
//   const theLongitude = 30.157104;

//   // Fetch weather data
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const url = `https://api.open-meteo.com/v1/forecast?latitude=${theLatitude}&longitude=${theLongitude}&hourly=temperature_2m&hourly=relative_humidity_2m,dew_point_2m`;
//         const response = await fetch(url);
//         const data: WeatherApiResponse = await response.json();
//         setApiResponses(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   if (!apiResponses || !apiResponses.hourly) {
//     return (
//       <View>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   // Process humidity data
//   const hourly = apiResponses?.hourly;
//   const humidityData: HumidityData =
//     hourly?.relative_humidity_2m &&
//     hourly?.temperature_2m &&
//     hourly?.dew_point_2m &&
//     hourly?.time
//       ? hourly.relative_humidity_2m.map((humidity, index) => ({
//           date: hourly.time[index].split("T")[0],
//           time: hourly.time[index].split("T")[1],
//           humidity,
//           temperature: hourly.temperature_2m[index],
//           dew_point_2m: hourly.dew_point_2m[index],
//         }))
//       : [];

//   return (
//     <AppContext.Provider
//       value={{
//         humidityData,
//         apiResponses,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// const styles = StyleSheet.create({});

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { View, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";

const sendNotification = async (message: any) => {
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

type HourlyData = {
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  time: string[];
};

type WeatherApiResponse = {
  hourly: HourlyData;
};

type HumidityData = {
  date: string;
  time: string;
  humidity: number;
  temperature: number;
  dew_point_2m: number;
}[];

type AppContextType = {
  humidityData: HumidityData;
  apiResponses: WeatherApiResponse | null;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

type ContextProvProps = {
  children: ReactNode;
};

export default function ContextProv({ children }: ContextProvProps) {
  const [apiResponses, setApiResponses] = useState<WeatherApiResponse | null>(
    null
  );
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  const theLatitude = -1.9504;
  const theLongitude = 30.157104;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${theLatitude}&longitude=${theLongitude}&hourly=temperature_2m&hourly=relative_humidity_2m,dew_point_2m`;
        const response = await fetch(url);
        const data: WeatherApiResponse = await response.json();
        setApiResponses(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const registerToken = async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token ?? "");
    };
    registerToken();
  }, []);

  const hourly = apiResponses?.hourly || {
    temperature_2m: [],
    relative_humidity_2m: [],
    dew_point_2m: [],
    time: [],
  };
  
    const todayTime = new Date().toLocaleTimeString().split(":")[0];
    const todayDate = new Date().toISOString().split("T")[0];

  const humidityData: HumidityData = hourly.relative_humidity_2m.map(
    (humidity, index) => ({
      date: hourly.time[index]?.split("T")[0] || "",
      time: hourly.time[index]?.split("T")[1] || "",
      humidity,
      temperature: hourly.temperature_2m[index] || 0,
      dew_point_2m: hourly.dew_point_2m[index] || 0,
    })
  )
  const highHumidity=humidityData.filter((data)=>data.humidity>=70);
  const todayHumData = highHumidity.filter(
    (data) => data.date === todayDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      
      if (todayHumData.length>0 && expoPushToken) {
        const notificationBody=String(
          todayHumData.map((entry)=>
            `Expected Humidity rise to ${entry.humidity} at ${entry.time}`))
        
        const message = {
          to: expoPushToken,
          sound: "default",
          title: "🌧️ High Humidity Alert!",
          body: notificationBody,
          data: {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          },
        };
        sendNotification(message);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [humidityData, expoPushToken]);

  if (!apiResponses) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AppContext.Provider value={{ humidityData, apiResponses }}>
      {children}
    </AppContext.Provider>
  );
}

async function registerForPushNotificationsAsync(): Promise<string | null> {
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token:", token);
    return token;
  } catch (error) {
    console.error("Error registering for push notifications:", error);
    return null;
  }
}


