import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import useReduxQuery from '@hooks/useReduxQuery';
import { TextInput } from 'react-native-gesture-handler';
import { getIcon } from '@api/icons';

type SearchBarProps = {
  onClickSearch?: () => any;
  onChangeQuery?: (query: string) => any;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {onChangeQuery, onClickSearch} = props;
  const {methods, state} = useReduxQuery();
  const {value} = state;

  const onChangeText = (text: string) => {
    if (onChangeQuery) onChangeQuery(text);
    methods.set(text);
  }
  const onPressSearchIcon = () => {
    if (onClickSearch) onClickSearch();
    methods.search();
  }

  return (
    <View>
      <View style={styles.contaner}>
        <TextInput style={styles.textInput} onChangeText={onChangeText}>{value}</TextInput>
        <TouchableOpacity onPress={onPressSearchIcon}>
          <View style={styles.iconContainer}>
            {getIcon("FontAwesome", {name: "search", color: "white", size: 20})}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textInput: {
    width: "80%",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    marginRight: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
  }
})

export default SearchBar
