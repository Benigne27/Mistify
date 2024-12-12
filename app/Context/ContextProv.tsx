import { StyleSheet, Text, View, Platform } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ActivityIndicator } from "react-native";

// Define types for the weather data structure
type HourlyData = {
  temperature_2m: number[];
  relative_humidity_2m: number[];
  rain: number[];
  time: string[];
};

type WeatherApiResponse = {
  hourly: HourlyData;
};

// Define type for humidity data used in the context
type HumidityData = {
  date: string;
  time: string;
  humidity: number;
  temperature: number;
  rain: number;
}[];

// Define type for context value
type AppContextType = {
  humidityData: HumidityData;
  apiResponses: WeatherApiResponse | null;
};

// Create context with the defined type
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Props type for ContextProv
type ContextProvProps = {
  children: ReactNode;
};

export default function ContextProv({ children }: ContextProvProps) {
  const [apiResponses, setApiResponses] = useState<WeatherApiResponse | null>(
    null
  );

  const theLatitude = -1.950221;
  const theLongitude = 30.157104;

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${theLatitude}&longitude=${theLongitude}&hourly=temperature_2m&hourly=relative_humidity_2m,rain`;
        const response = await fetch(url);
        const data: WeatherApiResponse = await response.json();
        setApiResponses(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!apiResponses || !apiResponses.hourly) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  // Process humidity data
  const hourly = apiResponses?.hourly;
  const humidityData: HumidityData =
    hourly?.relative_humidity_2m &&
    hourly?.temperature_2m &&
    hourly?.rain &&
    hourly?.time
      ? hourly.relative_humidity_2m.map((humidity, index) => ({
          date: hourly.time[index].split("T")[0],
          time: hourly.time[index].split("T")[1],
          humidity,
          temperature: hourly.temperature_2m[index],
          rain: hourly.rain[index],
        }))
      : [];

  return (
    <AppContext.Provider
      value={{
        humidityData,
        apiResponses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({});
