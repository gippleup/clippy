import ArticleViewer from '@components/ArticleViewer'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export class ArticleViewerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.taylor}>
          <ArticleViewer/>
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
})

export default ArticleViewerScreen
