import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

export type CustomRouteOption = {
  devName: string,
  component: React.FC | React.ComponentClass,
  params?: Object,
}

export const defineCustomRoute = (option: CustomRouteOption) => {
  return option;
}


type RenderCustomRoutesParams = {
  Stack: ReturnType<typeof createStackNavigator>,
  routes: Record<string, CustomRouteOption>,
}
export const renderCustomRoutes = (params: RenderCustomRoutesParams) => {
  const {Stack, routes} = params;
  return Object.entries(routes).map((route, i) => {
    const [screenName, screenDes] = route;
    const {component} = screenDes;
    return (
      <Stack.Screen
        key={screenName}
        name={screenName}
        component={component}
      />
    )
  });
}