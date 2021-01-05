import React from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native'
import useReduxQuery from '@hooks/useReduxQuery';
import { TextInput } from 'react-native-gesture-handler';
import { getIcon } from '@api/icons';
import RecentQueryList from './SearchBar/RecentQueryList';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import { getScreenConstant } from '@api/constants';

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
    <View style={styles.alignCenter}>
      <View style={styles.alignLeft}>
        <FlexHorizontal style={styles.barContainer}>
          <TextInput style={styles.textInput} onChangeText={onChangeText}>{value}</TextInput>
          <TouchableOpacity onPress={onPressSearchIcon}>
            <View style={styles.iconContainer}>
              {getIcon("FontAwesome", {name: "search", color: "white", size: 20})}
            </View>
          </TouchableOpacity>
        </FlexHorizontal>
        <View>
          <RecentQueryList/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: "center",
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  barContainer: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    padding: getScreenConstant("main").SEARCHBAR_PADDING,
  },
  textInput: {
    width: getScreenConstant("main").SEARCH_INPUT_WIDTH,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
  },
  iconContainer: {
    paddingHorizontal: 15,
    backgroundColor: "black",
    borderRadius: 10,
  },
})

export default SearchBar
