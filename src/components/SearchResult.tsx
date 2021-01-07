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
  const {methods: QueryMethods} = useReduxQuery();
  const {methods: ArticleViewerMethods} = useReduxArticleViewer();

  const onEndReached = () => {
    QueryMethods.fetchNextPage();
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPressEntry = (url: string) => {
    ArticleViewerMethods.load(url);
    navigation.navigate("ArticleViewerScreen", {});
  }

  const onPressClip = (indicator: ArticleIndicator) => {
    SearchResultMethods.toggleClip(indicator);
  }

  useReduxBoot();

  return (
    <View>
      <SearchResultList
        searchResults={SearchResultState.result}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        onPressEntry={onPressEntry}
        onPressClip={onPressClip}
      />
    </View>
  )
}

export default SearchResult
