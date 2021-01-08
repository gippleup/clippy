import { getScreenConstant } from '@api/constants'
import LoadingResult from '@components/LoadingResult'
import SearchBar from '@components/SearchBar'
import SearchResult from '@components/SearchResult'
import ThemeToggler from '@components/ThemeToggler'
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
          <ThemeToggler/>
        </View>
        <View style={styles.searchResultContainer}>
          <SearchResult/>
        </View>
        <LoadingResult/>
      </PageContainer>
    )
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: SEARCHBAR_CONTAINER_VERTICAL_PADDING,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  searchResultContainer: {
    flex: 1,
  }
})

export default SearchArticle
