import newsApi from '@api/news';
import { ArticleSearchResponse } from '@api/news/nyTimes'
import SearchResultList from '@components/SearchResult/SearchResultList'
import React from 'react'
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const fake: ArticleSearchResponse = require('@api/news/nyTimes/fake/article_search.json');
const searchResults = newsApi.nyTimes.util.mapResponseToSearchResult(fake);

const SearchResultListTester = () => {
  return (
    <View>
      <SearchResultList searchResults={searchResults} />
    </View>
  )
}

export default SearchResultListTester
