/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
import React from 'react';
import DevRoutes from '@router/Development';
import Developer from '@screens/Developer.tsx';
import ProRoutes from '@router/Production';
import Config from 'react-native-config';
import { renderCustomRoutes } from 'src/utils/router';
import 'react-native-gesture-handler';

const {ENV = "DEV"} = Config;
declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const DevScreens = renderCustomRoutes({Stack, routes: DevRoutes});
const ProductonScreens = renderCustomRoutes({Stack, routes: ProRoutes});

const renderDevMain = () => {
  if (ENV !== "DEV") return null;
  return (
    <Stack.Screen
      options={{
        headerTintColor: "white",
        headerStyle: {backgroundColor: "black"}
      }}
      name="Developer"
      component={Developer}
    />
  )
}

const Screens = ENV === "DEV" ? DevScreens : ProductonScreens;
const initialRouteName = ENV === "DEV" ? "Developer" : "Main";
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {renderDevMain()}
        {Screens}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
