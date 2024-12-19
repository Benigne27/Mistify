import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications'
import { Subscription } from 'expo-notifications';

import { useColorScheme } from '@/hooks/useColorScheme';
import Context from './Context/ContextProv'
import { LogBox } from 'react-native';
import React from 'react';
import ContextProv from './Context/ContextProv';
LogBox.ignoreAllLogs()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification:async()=>({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert:true
  })
})


export default function RootLayout() {

  const notificationListener=useRef<Subscription>()
  const responseListener=useRef<Subscription>()

   useEffect(()=>{

    //background or tapped notifications
    responseListener.current=Notifications.addNotificationResponseReceivedListener(response=>{
     console.log('Response: ', response)
    })

    //notifications when the app is open (foreground)
    notificationListener.current=Notifications.addNotificationReceivedListener(notification=>{
      console.log('Notification: ', notification)
    })

    //then clear
    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
   })
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ContextProv>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name='index'/>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="+not-found" />
      </Stack>
      </ContextProv>
  );
}
