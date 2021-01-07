import ClippedSearchResult from '@components/ClippedSearchResult'
import { PageContainer } from '@styled/PageContainer'
import { PageHeader } from '@styled/PageHeader'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class ClippedArticle extends Component {
  render() {
    return (
      <PageContainer>
        <PageHeader>Clipped Article</PageHeader>
        <View style={styles.searchResultContainer}>
          <ClippedSearchResult/>
        </View>
      </PageContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
  },
  searchResultContainer: {
    flex: 1,
  }
})

export default ClippedArticle
