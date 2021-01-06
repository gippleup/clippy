import { getComponentConstant } from '@api/constants';
import ClipButton from '@components/ClipButton';
import { ArticleIndicator, SearchResult } from '@redux/schema/searchResult';
import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'

type SearchResultEntryProps = {
  item: SearchResult;
  onPress: (url: string) => any;
  onPressClip: (indicator: ArticleIndicator) => any;
};

const {
  SEARCH_RESULT_HEIGHT,
  SEARCH_RESULT_WIDTH,
  SEARCH_RESULT_MARGIN_BOTTOM,
} = getComponentConstant("searchResult")

const SearchResultEntry: React.FC<SearchResultEntryProps> = (props) => {
  const {item} = props;
  const {headline, abstract, clipped, id, pub_date, publisher, web_url, photo_url} = item;
  const onPress = () => props.onPress(web_url);
  const onPressClip = () => props.onPressClip({
    id,
    publisher,
  })
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ImageBackground blurRadius={2} style={styles.backgroundImage} source={{uri: photo_url}}>
          <View style={styles.backgroundImageCover} />
          <View>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.abstract}>{pub_date}</Text>
            <Text style={styles.abstract}>{abstract}</Text>
          </View>
          <View>
            <ClipButton
              clipped={clipped}
              onPress={onPressClip}
            />
          </View>
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
    justifyContent: "space-between"
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
    marginBottom: SEARCH_RESULT_MARGIN_BOTTOM,
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
  },
})

export default React.memo(SearchResultEntry);
