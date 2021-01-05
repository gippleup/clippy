import SearchBar from '@components/SearchBar'
import useReduxSearchResult from '@hooks/useReduxSearchResult'
import React from 'react'
import { View, Text } from 'react-native'

const SearchBarTester = () => {
  const {methods, state} = useReduxSearchResult();
  console.log(state);

  return (
    <View>
      <SearchBar />
      {state.result.map((item) => (
        <Text>{item.headline}</Text>
      ))}
    </View>
  )
}

export default SearchBarTester
