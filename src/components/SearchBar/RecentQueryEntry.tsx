import { getComponentConstant, getScreenConstant } from '@api/constants';
import { getIcon } from '@api/icons';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type RecentQueryEntryProps = {
  text: string;
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
}

const RecentQueryEntry = (props: RecentQueryEntryProps) => {
  const {text} = props;
  const onPressEntry = () => props.onPressEntry(text);
  const onPressDelete = () => props.onPressDelete(text);
  return (
    <TouchableOpacity onPress={onPressEntry}>
      <FlexHorizontal style={styles.container}>
        <Text>{text}</Text>
        <TouchableOpacity onPress={onPressDelete}>
          <View style={styles.iconContainer}>
            {getIcon("FontAwesome", {name: "remove", size: 16})}
          </View>
        </TouchableOpacity>
      </FlexHorizontal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    width: getComponentConstant("searchBar").SEARCH_INPUT_WIDTH,
    justifyContent: "space-between"
  },
  iconContainer: {
    backgroundColor: "black",
    borderRadius: 5,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
})

export default RecentQueryEntry
