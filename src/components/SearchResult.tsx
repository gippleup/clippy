import useReduxQuery from '@hooks/useReduxQuery';
import useReduxSearchResult from '@hooks/useReduxSearchResult'
import { useNavigation } from '@react-navigation/native';
import { ArticleIndicator } from '@redux/schema/searchResult';
import React from 'react'
import SearchResultList from './SearchResult/SearchResultList';

const SearchResult = () => {
  const {methods: SearchResultMethods, state: SearchResultState} = useReduxSearchResult();
  const {methods: QueryMethods} = useReduxQuery();
  const onEndReached = () => {
    QueryMethods.fetchNextPage();
  }

  const navigation = useNavigation();
  const onPressEntry = (url: string) => {
    navigation.navigate("ArticleViewer", {url})
  }

  const onPressClip = (indicator: ArticleIndicator) => {
    SearchResultMethods.toggleClip(indicator);
  }

  return (
    <SearchResultList
      searchResults={SearchResultState.result}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      onPressEntry={onPressEntry}
      onPressClip={onPressClip}
    />
  )
}

export default SearchResult
