import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

const WebViewTester = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나는 웹뷰다!</Text>
      <View style={styles.webViewContainerWrapper}>
        <WebView containerStyle={styles.webViewContainer} source={{uri: "https://github.com/react-native-webview/react-native-webview"}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  webViewContainer: {
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  webViewContainerWrapper: {
    height: 300,    
  },
})

export default WebViewTester
