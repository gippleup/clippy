import useReduxSearchResult from '@hooks/useReduxSearchResult'
import React from 'react'
import { View, Text } from 'react-native'

const SearchResult = () => {
  const {methods, state} = useReduxSearchResult();
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default SearchResult
