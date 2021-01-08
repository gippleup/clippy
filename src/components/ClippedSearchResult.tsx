
import { useReduxClipped, useReduxQuery, useReduxArticleViewer } from '@hooks/reduxHooks';
import { RootStackParamList } from '@navigation/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArticleIndicator } from '@redux/schema/searchResult';
import React from 'react'
import SearchResultList from './SearchResult/SearchResultList';

const ClippedSearchResult = () => {
  const {methods: ClippedMethods, state: ClippedState} = useReduxClipped();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const {methods: ArticleViewerMethods} = useReduxArticleViewer();
  const onEndReached = () => {
    QueryMethods.fetchNextPage();
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPressEntry = (url: string) => {
    ArticleViewerMethods.load(url);
    navigation.navigate("ArticleViewerScreen", {})
  }

  const onPressClip = (indicator: ArticleIndicator) => {
    ClippedMethods.crossUnclip(indicator);
  }

  return (
    <SearchResultList
      searchResults={ClippedState.articles}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      onPressEntry={onPressEntry}
      onPressClip={onPressClip}
    />
  )
}

export default ClippedSearchResult
