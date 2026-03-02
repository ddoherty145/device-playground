import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import PlaygroundStack from './PlaygroundStack';
import NotesScreen from './screens/NotesScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Stack will handle headers in the Playground tab
          tabBarIcon: ({ focused, color, size }) => {
            const icons = {
              Playground: focused ? 'compass' : 'compass-outline',
              Notes: focused ? 'document-text' : 'document-text-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Playground" component={PlaygroundStack} />
        <Tab.Screen name="Notes" component={NotesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
