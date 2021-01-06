import { SupportedColorTheme } from '@api/colortheme';
import { getComponentConstant } from '@api/constants';
import ClipButton from '@components/SearchResult/ClipButton';
import { ArticleIndicator, SearchResult } from '@redux/schema/searchResult';
import { ArticleHeadline } from '@styled/ArticleHeadline';
import { shortenWithTail } from '@utils/article';
import { isAllTrue } from '@utils/condition';
import moment from 'moment';
import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'

const {
  SEARCH_RESULT_HEIGHT,
  SEARCH_RESULT_WIDTH,
  SEARCH_RESULT_MARGIN_BOTTOM,
  ABSTRACT_MAX_LENGTH,
  HEADLINE_MAX_LENGTH,
} = getComponentConstant("searchResult");

type SearchResultEntryProps = {
  item: SearchResult;
  onPress: (url: string) => any;
  onPressClip: (indicator: ArticleIndicator) => any;
  theme?: SupportedColorTheme;
};

const SearchResultEntry: React.FC<SearchResultEntryProps> = (props) => {
  const {item, theme="light"} = props;
  const {
    headline, abstract, clipped, id, pub_date,
    publisher, web_url, photo_url, clipStatus
  } = item;
  const relativeTime = moment(pub_date).fromNow();
  const shortenedHeadline = shortenWithTail(headline, 0, HEADLINE_MAX_LENGTH);
  const shortenedAbstract = shortenWithTail(abstract, 0, ABSTRACT_MAX_LENGTH);
  const onPress = props.onPress.bind(null, web_url);
  const onPressClip = props.onPressClip.bind(null, {id, publisher});
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ImageBackground blurRadius={2} style={styles.backgroundImage} source={{uri: photo_url}}>
          <View style={styles.backgroundImageCover} />
          <View>
            <ArticleHeadline themeName={theme}>{shortenedHeadline}</ArticleHeadline>
            <Text style={styles.abstract}>{relativeTime}</Text>
            <Text style={styles.abstract}>{shortenedAbstract}</Text>
          </View>
          <View>
            <ClipButton
              clipStatus={clipStatus}
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
  abstract: {
    color: "white",
  },
})

export default React.memo(SearchResultEntry, (prev, next) => isAllTrue([
  prev.item.id === next.item.id,
  prev.item.publisher === next.item.publisher,
  prev.theme === next.theme,
]));
