import { getScreenConstant } from '@api/constants'
import SearchBar from '@components/SearchBar'
import SearchResult from '@components/SearchResult'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const {SEARCHBAR_CONTAINER_VERTICAL_PADDING} = getScreenConstant("searchArticle");
export class SearchArticle extends Component {
  render() {
    return (
      <SafeAreaView style={{height: "100%"}}>
        <View style={styles.searchBarContainer}>
          <SearchBar/>
        </View>
        <View style={styles.searchResultContainer}>
          <SearchResult/>
        </View>
      </SafeAreaView>
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
