/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WorldScreen from "./screens/WorldScreen";
import CountriesScreen from "./screens/CountriesScreen"
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
        activeBackgroundColor: "black",
        inactiveBackgroundColor: "#2A2A2A",
        style: {
          borderTopWidth: 1,
          borderTopColor: '#2A2A2A',
        },
      }}
    >
      <Tab.Screen
        name="Dünya"
        component={WorldScreen}
        options={{
          tabBarLabel: 'World',
          tabBarIcon: ({ color, size }) => (
            <Icon

              name='globe'
              type='font-awesome'
              color={color}
            />

          ),
        }}
      />
      <Tab.Screen
        name="Sıralama"
        component={CountriesScreen}
        options={{

          tabBarLabel: 'Countries',
          tabBarIcon: ({ color, size }) => (
            <Icon

              name='list-ol'
              type='font-awesome'
              color={color}
            />

          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



