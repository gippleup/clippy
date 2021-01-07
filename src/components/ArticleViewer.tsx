import { SCREEN_WIDTH } from '@api/constants/generic'
import useReduxArticleViewer from '@hooks/useReduxArticleViewer'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import ArticleLoadingIndicator from './ArticleViewer/ArticleLoadingIndicator'

const ArticleViewer = () => {
  const {state, methods} = useReduxArticleViewer();
  const onLoadEnd = () => methods.setStatus("idle");
  const {status} = state;
  const display = status === "pending" ? "none" : "flex";
  return (
    <WebView
      style={{display: display}}
      containerStyle={styles.webContainer}
      source={{uri: state.url}}
      startInLoadingState
      renderLoading={() => <ArticleLoadingIndicator/>}
      onLoadEnd={onLoadEnd}
    />
  )
}

const styles = StyleSheet.create({
  webContainer: {
    width: SCREEN_WIDTH - 20,
  }
})

export default ArticleViewer
