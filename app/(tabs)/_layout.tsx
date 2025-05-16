import {Stack, Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function TabLayout() {

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
      </Stack>
    </SafeAreaProvider>
  );
}
