import { getComponentConstant } from '@api/constants';
import { useNavigation } from '@react-navigation/native';
import { SearchResult } from '@redux/schema/searchResult';
import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

type SearchResultEntryProps = {
  item: SearchResult;
};

const {
  SEARCH_RESULT_HEIGHT,
  SEARCH_RESULT_WIDTH,
} = getComponentConstant("searchResult")

const SearchResultEntry: React.FC<SearchResultEntryProps> = (props) => {
  const {item} = props;
  const {headline, abstract, clipped, id, pub_date, publisher, web_url, photo_url} = item;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ArticleViewer", {url: web_url})
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ImageBackground blurRadius={2} style={styles.backgroundImage} source={{uri: photo_url}}>
          <View style={styles.backgroundImageCover} />
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.abstract}>{pub_date}</Text>
          <Text style={styles.abstract}>{abstract}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: SEARCH_RESULT_WIDTH,
    height: SEARCH_RESULT_HEIGHT,
    padding: 10,
  },
  backgroundImageCover: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: SEARCH_RESULT_WIDTH,
    height: SEARCH_RESULT_HEIGHT,
  },
  container: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  abstract: {
    color: "white",
  }
})

export default SearchResultEntry
