import {Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='newTime' options={{headerShown: false}}/>

      </Stack>
    </SafeAreaProvider>
  );
}
