import { SupportedColorTheme } from '@api/colortheme';
import { getComponentConstant } from '@api/constants';
import { ArticleIndicator, SearchResult } from '@redux/schema/searchResult'
import React from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo, RefreshControl } from 'react-native'
import SearchResultEntry from './SearchResultEntry'

const {SEARCH_RESULT_HEIGHT, SEARCH_RESULT_MARGIN_BOTTOM, SEARCH_RESULT_WIDTH} = getComponentConstant("searchResult");
type PropFromFlatList = "onEndReached" | "onEndReachedThreshold";

type SearchResultListProps = {
  searchResults: SearchResult[];
  onPressEntry: (url: string) => any;
  onPressClip: (indicator: ArticleIndicator) => any;
  onRefresh?: () => any;
  refreshing?: boolean;
} & Pick<FlatListProps<{}>, PropFromFlatList>

const getItemLayout: FlatListProps<{}>["getItemLayout"] = (data, index: number) => ({
  index,
  length: SEARCH_RESULT_HEIGHT,
  offset: (SEARCH_RESULT_HEIGHT + SEARCH_RESULT_MARGIN_BOTTOM) * index,
})

const SearchResultList: React.FC<SearchResultListProps> = (props) => {
  const {
    onRefresh,
    onPressClip,
    onPressEntry,
    onEndReached,
    searchResults,
    onEndReachedThreshold,
    refreshing = false,
  } = props;

  const renderItem = (info: ListRenderItemInfo<SearchResult>) => (
    <SearchResultEntry
      onPress={onPressEntry}
      onPressClip={onPressClip}
      item={info.item}
    />
  )


  return (
    <FlatList
      getItemLayout={getItemLayout}
      data={searchResults}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={(
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    />
  )
}

export default SearchResultList
