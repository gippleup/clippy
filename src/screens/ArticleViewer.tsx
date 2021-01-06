import { SCREEN_WIDTH } from '@api/constants/generic'
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
      <View style={styles.container}>
        <View style={styles.taylor}>
          <WebView
            containerStyle={styles.webContainer}
            source={{uri: url}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taylor: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  webContainer: {
    width: SCREEN_WIDTH - 20,
  }
})

export default ArticleViewer
