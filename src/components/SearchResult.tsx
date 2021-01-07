import useReduxArticleViewer from '@hooks/useReduxArticleViewer';
import useReduxBoot from '@hooks/useReduxBoot';
import useReduxQuery from '@hooks/useReduxQuery';
import useReduxSearchResult from '@hooks/useReduxSearchResult'
import { RootStackParamList } from '@navigation/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArticleIndicator } from '@redux/schema/searchResult';
import React from 'react'
import { View } from 'react-native';
import SearchResultList from './SearchResult/SearchResultList';


const SearchResult = () => {
  const {methods: SearchResultMethods, state: SearchResultState} = useReduxSearchResult();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const {methods: ArticleViewerMethods} = useReduxArticleViewer();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onEndReached = QueryMethods.fetchNextPage;

  const onPressEntry = (url: string) => {
    ArticleViewerMethods.load(url);
    navigation.navigate("ArticleViewerScreen", {});
  }

  const onPressClip = (indicator: ArticleIndicator) => {
    SearchResultMethods.toggleClip(indicator);
  }

  const onRefresh = QueryMethods.refresh;

  useReduxBoot();

  return (
    <View>
      <SearchResultList
        searchResults={SearchResultState.result}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        onPressEntry={onPressEntry}
        onPressClip={onPressClip}
        onRefresh={onRefresh}
        refreshing={QueryState.refreshing}
      />
    </View>
  )
}

export default SearchResult
