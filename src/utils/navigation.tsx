import React from 'react'
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack'

export type CustomRouteOption<T={}> = {
  devName: string,
  component: React.FC<any> | React.ComponentClass<any>,
  initialParams: T,
  options?: StackNavigationOptions;
}

export const defineCustomRoute: <T={}>(routeOption: CustomRouteOption<T>) => CustomRouteOption<T> = (routeOption) => ({
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