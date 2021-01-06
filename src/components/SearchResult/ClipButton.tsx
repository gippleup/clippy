import { getComponentConstant } from '@api/constants';
import { SearchResult } from '@redux/schema/searchResult';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import { isAllTrue } from '@utils/condition';
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { shallowEqual } from 'react-redux';

type ClipButtonProps = {
  clipped: boolean;
  clipStatus: SearchResult["clipStatus"];
  onPress: () => any;
}

const ClipButton: React.FC<ClipButtonProps> = (props) => {
  const {onPress, clipped, clipStatus} = props;
  const textTheme = clipped ? styles.clipped : styles.notClipped;
  const text = clipped ? "클립됨" : "클립안됨";
  const Content = () => clipStatus === "idle"
    ? <Text style={[styles.text, textTheme]}>{text}</Text>
    : <ActivityIndicator size="small" color="white" />

  return (
    <FlexHorizontal>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.textContainer}>
          <Content />
        </View>
      </TouchableOpacity>
    </FlexHorizontal>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: getComponentConstant("clipButton").CLIPBUTTON_WIDTH,
    height: getComponentConstant("clipButton").CLIPBUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    borderRadius: 100,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  clipped: {
    color: "white",
  },
  notClipped: {
    color: "black",
  },
})

export default React.memo(ClipButton, (prev, next) => isAllTrue([
  prev.clipStatus === next.clipStatus,
  prev.clipped === next.clipped,
]));
