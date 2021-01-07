import { getScreenConstant } from '@api/constants'
import SearchBar from '@components/SearchBar'
import SearchResult from '@components/SearchResult'
import { PageContainer } from '@styled/PageContainer'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

const {SEARCHBAR_CONTAINER_VERTICAL_PADDING} = getScreenConstant("searchArticle");

export class SearchArticle extends Component {
  render() {
    return (
      <PageContainer>
        <View style={styles.searchBarContainer}>
          <SearchBar/>
        </View>
        <View style={styles.searchResultContainer}>
          <SearchResult/>
        </View>
      </PageContainer>
    )
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: SEARCHBAR_CONTAINER_VERTICAL_PADDING,
  },
  searchResultContainer: {
    flex: 1,
  }
})

export default SearchArticle
