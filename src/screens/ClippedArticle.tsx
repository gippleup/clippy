import { getGenericConstant } from '@api/constants'
import ClippedSearchResult from '@components/ClippedSearchResult'
import { PageContainer } from '@styled/PageContainer'
import { defineThemedComponent } from '@utils/theme'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { css } from 'styled-components'
const {PAGE_HEADER_HEIGHT} = getGenericConstant();

const PageHeader = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${colors.PAGE_HEADER_CLIPPED};
  `,
  commonStyle: css`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    text-align-vertical: center;
    height: ${PAGE_HEADER_HEIGHT}px;
  `,
})

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
