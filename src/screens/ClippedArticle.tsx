import ClippedSearchResult from '@components/ClippedSearchResult'
import useReduxTheme from '@hooks/useReduxTheme'
import { PageContainer } from '@styled/PageContainer'
import { PageHeader } from '@styled/PageHeader'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ClippedArticleHeader = () => {
  const {state: ThemeState} = useReduxTheme();
  return (
    <PageHeader themeName={ThemeState.name}>Clipped Articles</PageHeader>
  )
}

const ClippedArticlePageContainer: React.FC<{}> = (props) => {
  const {state: ThemeState} = useReduxTheme();
  return (
    <PageContainer
      themeName={ThemeState.name}
      children={props.children}
    />
  )
}

export class ClippedArticle extends Component {
  render() {
    return (
      <ClippedArticlePageContainer>
        <ClippedArticleHeader/>
        <View style={styles.searchResultContainer}>
          <ClippedSearchResult/>
        </View>
      </ClippedArticlePageContainer>
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
