import React, { Component } from 'react'
import { StatusBar, ViewStyle } from 'react-native'
import {BottomTabBarOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchArticle from './SearchArticle';
import ClippedArticle from './ClippedArticle';
import { getIcon } from '@api/icons';
import useReduxTheme from '@hooks/useReduxTheme';
import chroma from 'chroma-js';
import { getColorTheme } from '@api/colortheme';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {state: {name}} = useReduxTheme();
  const {background} = getColorTheme(name);
  const tabBarStyle: ViewStyle = {
    backgroundColor: background,
    borderTopColor: chroma(background).brighten().hex(),
  }

  const tabBarOptions: BottomTabBarOptions = {
    style: tabBarStyle,
  }

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
          name="Clipped"
          component={ClippedArticle}
          options={{
            tabBarIcon: ({color, size}) => getIcon("FontAwesome",{color, size, name: "bookmark"}),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchArticle}
          options={{
            tabBarIcon: ({color, size}) => getIcon("FontAwesome",{color, size, name: "search"})
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
