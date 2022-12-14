import React from 'react';
import Onboarding from './src/screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // <Onboarding />;
};

export default App;
