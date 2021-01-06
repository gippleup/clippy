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
import { createStackNavigator, StackNavigationOptions,  } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux'
import React from 'react';
import Developer from '@screens/Developer.tsx';
import Config from 'react-native-config';
import { renderCustomRoutes } from '@utils/navigation';
import routes from '@navigation/routes';
import 'react-native-gesture-handler';
import store from '@redux/store';
import {enableScreens} from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();
declare const global: {HermesInternal: null | {}};
const {ENV = "DEV"} = Config;

const RootStack = createStackNavigator();
const initialRouteName = ENV === "DEV" ? "Developer" : "Main";
const Screens = renderCustomRoutes({Stack: RootStack, routes: routes[ENV]});

const DevMainScreenOptions: StackNavigationOptions = {
  headerTintColor: "white",
  headerStyle: {backgroundColor: "black"}
}

const renderDevMain = () => {
  if (ENV !== "DEV") return null;
  return (
    <RootStack.Screen
      name="Developer"
      component={Developer}
      options={DevMainScreenOptions}
    />
  )
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" initialRouteName={initialRouteName}>
            {renderDevMain()}
            {Screens}
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
