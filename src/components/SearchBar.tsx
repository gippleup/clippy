import React from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions, Keyboard } from 'react-native'
import useReduxQuery from '@hooks/useReduxQuery';
import { TextInput } from 'react-native-gesture-handler';
import { getIcon } from '@api/icons';
import RecentQueryList from './SearchBar/RecentQueryList';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import { getComponentConstant } from '@api/constants';
import useReduxRecentQuery from '@hooks/useReduxRecentQuery';

const {SEARCHBAR_HEIGHT, SEARCHBAR_PADDING, SEARCH_INPUT_WIDTH} = getComponentConstant("searchBar");

const SearchBar = () => {
  const {methods: RecentQueryMethods, state: RecentQueryState} = useReduxRecentQuery();
  const {methods: QueryMethods, state} = useReduxQuery();
  const {value} = state;

  const onChangeText = (text: string) => QueryMethods.set(text);
  const onPressSearchIcon = () => QueryMethods.search();
  const hideRecentQuery = () => RecentQueryMethods.setVisiblity(false);
  const showRecentQuery = () => RecentQueryMethods.setVisiblity(true);
  const onPressDeleteRecentQuery = (q: string) => RecentQueryMethods.remove(q);
  const onPressRecentQueryEntry = (q: string) => {
    QueryMethods.set(q);
    QueryMethods.search();
  }

  const SearchIcon = getIcon("FontAwesome", {name: "search", color: "white", size: 20});

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidHide", hideRecentQuery);
    Keyboard.addListener("keyboardDidShow", showRecentQuery);
    return () => {
      Keyboard.removeListener("keyboardDidHide", hideRecentQuery);
      Keyboard.removeListener("keyboardDidShow", showRecentQuery);
    }
  })

  return (
    <View style={styles.alignCenter}>
      <View style={styles.alignLeft}>
        <FlexHorizontal style={styles.barContainer}>
          <TextInput
            value={value}
            style={styles.textInput}
            onChangeText={onChangeText}
          />
          <TouchableOpacity onPress={onPressSearchIcon}>
            <View style={styles.iconContainer}>
              {SearchIcon}
            </View>
          </TouchableOpacity>
        </FlexHorizontal>
        <View>
          <RecentQueryList
            onPressDelete={onPressDeleteRecentQuery}
            onPressEntry={onPressRecentQueryEntry}
            state={RecentQueryState}
          />
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
    padding: SEARCHBAR_PADDING,
    height: SEARCHBAR_HEIGHT,
  },
  textInput: {
    width: SEARCH_INPUT_WIDTH,
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
