import newsApi from '@api/news';
import { ArticleSearchResponse } from '@api/news/nyTimes/schema';
import SearchResultList from '@components/SearchResult/SearchResultList'
import React from 'react'
import { View } from 'react-native';
const fake: ArticleSearchResponse = require('@api/news/nyTimes/fake/article_search.json');
const searchResults = newsApi.nyTimes.util.mapResponseToSearchResult(fake);

const SearchResultListTester = () => {
  return (
    <View>
      <SearchResultList
        onPressClip={() => {}}
        onPressEntry={() => {}}
        searchResults={searchResults}
      />
    </View>
  )
}

export default SearchResultListTester
