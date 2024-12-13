import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5D3FD3',
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        // tabBarStyle: Platform.select({
        //   ios: {
        //     position: 'absolute',
        //   },
        //   default: {},
        // }),

        tabBarStyle:{
          backgroundColor:'#fafafa'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="house.fill" color={focused? '#5D3FD3': color} />,
        }}
      />
      <Tabs.Screen
        name="AddNote"
        options={{
          title: 'AddNote',
        
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="cross.fill" color={focused? '#5D3FD3': color} />,
        }}
      />
       <Tabs.Screen
        name="Send"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="bell.fill" color={focused? '#5D3FD3': color} />,
        }}
      />
      <Tabs.Screen
        name="humidity"
        options={{
          title: 'Humidity',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="cloud.fill" color={focused? '#5D3FD3': color} />,
        }}
      />
     
      
    </Tabs>
  );
}
