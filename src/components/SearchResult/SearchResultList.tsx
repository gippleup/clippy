import { SearchResult } from '@redux/schema/searchResult'
import React from 'react'
import { View, Text, FlatList, FlatListProps, ListRenderItemInfo } from 'react-native'
import SearchResultEntry from './SearchResultEntry'

type SearchResultListProps = {
  searchResults: SearchResult[];
}

const SearchResultList: React.FC<SearchResultListProps> = (props) => {
  const {searchResults} = props;
  const renderItem = (info: ListRenderItemInfo<SearchResult>) => (
    <SearchResultEntry item={info.item} />
  )

  return (
    <View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default SearchResultList
