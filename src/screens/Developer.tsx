import DeveloperButton from '@components/DeveloperButton'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Testers from '@router/Development';
import {RootStackParamList} from '@router/RootStackParamList';

type DeveloperProps = {
  navigation: StackNavigationProp<RootStackParamList, any>;
  route: RouteProp<RootStackParamList, any>;
}

export class Developer extends Component<DeveloperProps> {
  constructor(props: Readonly<DeveloperProps>) {
    super(props);
  }
  render() {
    const {props} = this;
    const {navigation} = props;
    return (
      <View style={styles.container}>
        {Object.entries(Testers).map((route) => {
          const [screenName, screenDesc] = route;
          const {devName, params} = screenDesc;
          return (
            <DeveloperButton
              key={screenName}
              navigation={navigation}
              screenName={screenName}
              text={devName}
            />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
  }
})

export default Developer
