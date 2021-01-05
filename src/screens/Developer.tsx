import DeveloperButton from '@components/DeveloperButton'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Testers from '@navigation/routes/Development';
import { CustomRouteOption } from '@utils/navigation';
import { RootStackParamList } from '@navigation/routes';

type DeveloperProps = {
  navigation: StackNavigationProp<RootStackParamList, any>;
  route: RouteProp<RootStackParamList, any>;
}

export class Developer extends Component<DeveloperProps> {
  constructor(props: Readonly<DeveloperProps>) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(entry: [string, CustomRouteOption]) {
    const {props} = this;
    const {navigation} = props;
    const [screenName, screenDesc] = entry;
    const {devName, params} = screenDesc;
    return (
      <DeveloperButton
        key={screenName}
        navigation={navigation}
        screenName={screenName}
        text={devName}
      />
    )
  }

  render() {
    const {renderButton} = this;
    return (
      <View style={styles.container}>
        {Object.entries(Testers).map(renderButton)}
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
