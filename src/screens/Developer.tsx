import DeveloperButton from '@components/DeveloperButton'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import routes from '@navigation/routes';
import { CustomRouteOption } from '@utils/navigation';
import { RootStackParamList } from '@navigation/routes';

const isOnProductionRoute = (screenName: string) => Object.keys(routes.PRODUCTION).indexOf(screenName) !== -1;

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
    const {devName, initialParams} = screenDesc;
    const type = isOnProductionRoute(screenName) ? "production" : "dev";
    return (
      <DeveloperButton
        key={screenName}
        navigation={navigation}
        screenName={screenName}
        initialParams={initialParams}
        text={devName}
        type={type}
      />
    )
  }

  render() {
    const {renderButton} = this;
    return (
      <View style={styles.container}>
        {Object.entries(routes.DEV).map(renderButton)}
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
