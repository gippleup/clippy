import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

type DeveloperButtonProps = {
  screenName: string;
  text?: string;
  navigation: NavigationProp<any>;
  params?: Object;
}

const DeveloperButton: React.FC<DeveloperButtonProps> = (props) => {
  const {screenName, navigation, text, params} = props;
  const onPress = () => navigation.navigate(screenName, params);
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{text || screenName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#543864",
    padding: 20,
    color: "#ff6464",
    fontSize: 20,
    fontWeight: "bold",
  }
})

export default DeveloperButton
