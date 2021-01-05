import { NavigationProp } from '@react-navigation/native';
import chroma from 'chroma-js';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

type DeveloperButtonProps = {
  screenName: string;
  text?: string;
  navigation: NavigationProp<any>;
  initialParams?: Object;
  type?: "dev" | "production";
}

const DeveloperButton: React.FC<DeveloperButtonProps> = (props) => {
  const {screenName, navigation, text, initialParams, type} = props;
  const onPress = () => navigation.navigate(screenName, initialParams);
  const relevantTheme = type === "dev" ? styles.devTheme : styles.productionTheme;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.button, relevantTheme]}>{text || screenName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
  },
  devTheme: {
    borderBottomColor: "green",
    backgroundColor: "black",
    color: "mediumseagreen",
  },
  productionTheme: {
    borderBottomColor: "tomato",
    backgroundColor: "black",
    color: "coral",
  }
})

export default DeveloperButton
