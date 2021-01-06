import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@api/constants/dimension'
import { RootStackParamList } from '@navigation/routes'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

export type ArticleViewerParams = {
  url: string;
};

export const ArticleViewrInitialParams = {url: "https://github.com/"};

export type ArticleViewerProps = {
  navigation: StackNavigationProp<RootStackParamList, "ArticleViewer">;
  route: RouteProp<RootStackParamList, "ArticleViewer">;
};

export class ArticleViewer extends Component<ArticleViewerProps> {
  constructor(props: Readonly<ArticleViewerProps>) {
    super(props);
  }

  render() {
    const {route} = this.props;
    const {url} = route.params;
    return (
      <WebView
        containerStyle={styles.webContainer}
        source={{uri: url}}
      />
    )
  }
}

const styles = StyleSheet.create({
  webContainer: {
    width: SCREEN_WIDTH,
  }
})

export default ArticleViewer
