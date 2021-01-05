import React from 'react'
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack'

export type CustomRouteOption = {
  devName: string,
  component: React.FC | React.ComponentClass,
  params?: Object,
  options?: StackNavigationOptions;
}

export const defineCustomRoute = (routeOption: CustomRouteOption): CustomRouteOption => ({
  params: undefined,
  options: {},
  ...routeOption,
});


type RenderCustomRoutesParams = {
  Stack: ReturnType<typeof createStackNavigator>,
  routes: Record<string, CustomRouteOption>,
}
export const renderCustomRoutes = (params: RenderCustomRoutesParams) => {
  const {Stack, routes} = params;
  return Object.entries(routes).map((route, i) => {
    const [screenName, screenDes] = route;
    const {component, options} = screenDes;
    return (
      <Stack.Screen
        key={screenName}
        name={screenName}
        component={component}
        options={options}
      />
    )
  });
}