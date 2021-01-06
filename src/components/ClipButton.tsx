import { getComponentConstant } from '@api/constants';
import { ArticleIndicator } from '@redux/schema/searchResult';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type ClipButtonProps = {
  clipped: boolean;
  onPress: () => any;
}

const ClipButton: React.FC<ClipButtonProps> = (props) => {
  const {onPress, clipped} = props;
  const theme = clipped ? styles.clipped : styles.notClipped;
  const text = clipped ? "클립됨" : "클립안됨"
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, theme]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    width: getComponentConstant("clipButton").CLIPBUTTON_WIDTH,
    height: getComponentConstant("clipButton").CLIPBUTTON_HEIGHT,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  clipped: {
    backgroundColor: "dodgerblue",
    color: "white",
  },
  notClipped: {
    backgroundColor: "white",
    color: "black",
  },
})

export default ClipButton
