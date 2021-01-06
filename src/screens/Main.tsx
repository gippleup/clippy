import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchArticle from './SearchArticle';
import ClippedArticle from './ClippedArticle';
import { getIcon } from '@api/icons';
const Tab = createBottomTabNavigator();
export class Main extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{tabBarIcon: ({color, size}) => getIcon("FontAwesome",{color, size, name: "bookmark"})}}
          name="Clipped"
          component={ClippedArticle}
        />
        <Tab.Screen
          options={{tabBarIcon: ({color, size}) => getIcon("FontAwesome",{color, size, name: "search"})}}
          name="Search"
          component={SearchArticle}
        />
      </Tab.Navigator>
    )
  }
}

export default Main
