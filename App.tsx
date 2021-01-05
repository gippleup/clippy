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
import { Provider } from 'react-redux'
import React from 'react';
import Developer from '@screens/Developer.tsx';
import Config from 'react-native-config';
import { renderCustomRoutes } from '@utils/navigation';
import routes from '@navigation/routes';
import 'react-native-gesture-handler';
import store from '@redux/store';

const {ENV = "DEV"} = Config;
declare const global: {HermesInternal: null | {}};

const RootStack = createStackNavigator();

const renderDevMain = () => {
  if (ENV !== "DEV") return null;
  return (
    <RootStack.Screen
      options={{
        headerTintColor: "white",
        headerStyle: {backgroundColor: "black"}
      }}
      name="Developer"
      component={Developer}
    />
  )
}

const initialRouteName = ENV === "DEV" ? "Developer" : "Main";
const Screens = renderCustomRoutes({Stack: RootStack, routes: routes[ENV]});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName={initialRouteName}>
          {renderDevMain()}
          {Screens}
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
