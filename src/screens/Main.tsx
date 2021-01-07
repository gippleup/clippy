import React, { Component } from 'react'
import { StatusBar, ViewStyle } from 'react-native'
import SearchArticle from './SearchArticle';
import ClippedArticle from './ClippedArticle';
import { getIcon } from '@api/icons';
import useReduxTheme from '@hooks/useReduxTheme';
import chroma from 'chroma-js';
import { getColorTheme } from '@api/colortheme';
import { createMaterialTopTabNavigator, MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  const {state: {theme}} = useReduxTheme();
  const {background} = getColorTheme(theme);
  const tabBarStyle: ViewStyle = {
    backgroundColor: background,
    borderTopColor: chroma(background).brighten().hex(),
  }

  const tabBarOptions: MaterialTopTabBarOptions = {
    style: tabBarStyle,
    indicatorContainerStyle: {
      transform: [{scaleY: -1}],
    },
    indicatorStyle: {
      height: 3,
    }
  }

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
          name="Clipped"
          component={ClippedArticle}
          options={{
            tabBarIcon: ({color, focused}) => getIcon("FontAwesome",{color, size: 30, name: "bookmark"}),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchArticle}
          options={{
            tabBarIcon: ({color, focused}) => getIcon("FontAwesome",{color, size: 30, name: "search"})
          }}
        />
    </Tab.Navigator>
  )
}

export class Main extends Component {
  render() {
    return (
      <>
      <StatusBar hidden />
      <TabNavigator/>
      </>
    )
  }
}

export default Main
