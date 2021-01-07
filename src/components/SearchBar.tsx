import { useReduxRecentQuery, useReduxQuery } from '@hooks/reduxHooks';
import React from 'react'
import { TouchableOpacity, StyleSheet, View, Keyboard } from 'react-native'
import RecentQueryList from './SearchBar/RecentQueryList';
import _Styled from './SearchBar/_Styled/SearchBar';
const {BarContainer, IconContainer, Input, Icon} = _Styled;

const SearchBar = () => {
  const {methods: RecentQueryMethods, state: RecentQueryState} = useReduxRecentQuery();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const {value} = QueryState;
  const onChangeText = (text: string) => QueryMethods.set(text);
  const onPressSearchIcon = () => QueryMethods.search();
  const hideRecentQuery = () => RecentQueryMethods.setVisiblity(false);
  const showRecentQuery = () => RecentQueryMethods.setVisiblity(true);
  const onPressDeleteRecentQuery = (q: string) => RecentQueryMethods.remove(q);
  const onPressRecentQueryEntry = (q: string) => {
    QueryMethods.set(q);
    QueryMethods.search();
  }

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
        <BarContainer>
          <Input
            value={value}
            onChangeText={onChangeText}
          />
          <TouchableOpacity onPress={onPressSearchIcon}>
            <IconContainer>
              <Icon name="search" size={20} />
            </IconContainer>
          </TouchableOpacity>
        </BarContainer>
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
})

export default SearchBar
