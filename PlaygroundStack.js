import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExploreScreen from './screens/ExploreScreen';
import FeatureScreen from './screens/FeatureScreen';

const Stack = createNativeStackNavigator();

export default function PlaygroundStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ title: 'Device Playground' }}
      />
      <Stack.Screen
        name="Feature"
        component={FeatureScreen}
        options={{ title: 'My Feature' }}
      />
    </Stack.Navigator>
  );
}