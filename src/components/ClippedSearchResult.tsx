import useReduxBoot from '@hooks/useReduxBoot';
import useReduxClipped from '@hooks/useReduxClipped';
import useReduxQuery from '@hooks/useReduxQuery';
import { RootStackParamList } from '@navigation/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArticleIndicator } from '@redux/schema/searchResult';
import React from 'react'
import SearchResultList from './SearchResult/SearchResultList';

const ClippedSearchResult = () => {
  const {methods: ClippedMethods, state: ClippedState} = useReduxClipped();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const onEndReached = () => {
    QueryMethods.fetchNextPage();
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPressEntry = (url: string) => {
    navigation.navigate("ArticleViewerScreen", {})
  }

  const onPressClip = (indicator: ArticleIndicator) => {
    ClippedMethods.crossUnclip(indicator);
  }

  useReduxBoot();

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
