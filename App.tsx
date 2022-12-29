import React from 'react';
import Onboarding from './src/screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/splash';
import WelcomePage from './src/screens/welcomePage';
import AnnotationFoods from './src/screens/AnnotationFoods';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
      </Stack.Navigator>

      {/* Drawer */}

      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={WelcomePage} />
        <Drawer.Screen name="Food Annotation" component={AnnotationFoods} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
  // <Onboarding />;
};

export default App;
