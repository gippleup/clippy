import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingArticle = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
})

export default LoadingArticle
