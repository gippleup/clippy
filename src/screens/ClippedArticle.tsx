import ClippedSearchResult from '@components/ClippedSearchResult'
import SearchResult from '@components/SearchResult'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class ClippedArticle extends Component {
  render() {
    return (
      <View>
        <ClippedSearchResult/>
      </View>
    )
  }
}

export default ClippedArticle
