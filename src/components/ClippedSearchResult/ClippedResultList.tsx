import { getComponentConstant } from '@api/constants';
import { ArticleIndicator, Clipped, SearchResult } from '@redux/schema/searchResult'
import React from 'react'
import { View, Text, FlatList, FlatListProps, ListRenderItemInfo } from 'react-native'
import SearchResultEntry from './ClippedResultEntry'

const {SEARCH_RESULT_HEIGHT, SEARCH_RESULT_MARGIN_BOTTOM, SEARCH_RESULT_WIDTH} = getComponentConstant("searchResult");
type PropFromFlatList = "onEndReached" | "onEndReachedThreshold";

type ClippedResultListProps = {
  clippedResults: Clipped[];
  onPressEntry: (url: string) => any;
  onPressClip: (indicator: ArticleIndicator) => any;
} & Pick<FlatListProps<{}>, PropFromFlatList>

const getItemLayout: FlatListProps<{}>["getItemLayout"] = (data, index: number) => ({
  index,
  length: SEARCH_RESULT_HEIGHT,
  offset: (SEARCH_RESULT_HEIGHT + SEARCH_RESULT_MARGIN_BOTTOM) * index,
})

const ClippedResultList: React.FC<ClippedResultListProps> = (props) => {
  const {
    clippedResults,
    onEndReached,
    onPressEntry,
    onPressClip,
    onEndReachedThreshold,
  } = props;

  const renderItem = (info: ListRenderItemInfo<Clipped>) => (
    <SearchResultEntry
      onPress={onPressEntry}
      onPressClip={onPressClip}
      item={info.item}
    />
  )

  return (
    <FlatList
      getItemLayout={getItemLayout}
      data={clippedResults}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ClippedResultList
