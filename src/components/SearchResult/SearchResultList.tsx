import { SearchResult } from '@redux/schema/searchResult'
import React from 'react'
import { View, Text, FlatList, FlatListProps, ListRenderItemInfo } from 'react-native'
import SearchResultEntry from './SearchResultEntry'

const {SEARCH_RESULT_HEIGHT, SEARCH_RESULT_MARGIN_BOTTOM, SEARCH_RESULT_WIDTH} = getComponentConstant("searchResult");
type PropFromFlatList = "onEndReached" | "onEndReachedThreshold";

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
