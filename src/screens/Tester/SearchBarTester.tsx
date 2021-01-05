import SearchBar from '@components/SearchBar'
import useReduxBoot from '@hooks/useReduxBoot'
import useReduxSearchResult from '@hooks/useReduxSearchResult'
import React from 'react'
import { View, Text } from 'react-native'

const SearchBarTester = () => {
  const {state, methods} = useReduxSearchResult();

  useReduxBoot();

  return (
    <View>
      <SearchBar />
      {state.result.map((item) => (
        <Text key={item.id}>{item.headline}</Text>
      ))}
    </View>
  )
}

export default SearchBarTester
