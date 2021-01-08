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
import _Styled from './_Styled/SearchResultEntry'
const {
  Abstract,
  BackgroundImageCover,
  ContentContainer,
  Container,
  PubDate,
} = _Styled;

const {
  ABSTRACT_MAX_LENGTH,
  HEADLINE_MAX_LENGTH,
} = getComponentConstant("searchResult");

type SearchResultEntryProps = {
  item: SearchResult;
  onPress: (url: string) => any;
  onPressClip: (indicator: ArticleIndicator) => any;
};

const SearchResultEntry: React.FC<SearchResultEntryProps> = (props) => {
  const {item} = props;
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
    <Container>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ContentContainer blurRadius={2} source={{uri: photo_url}}>
          <BackgroundImageCover clipped={clipped}/>
          <View>
            <ArticleHeadline clipped={clipped}>{shortenedHeadline}</ArticleHeadline>
            <PubDate>{relativeTime}</PubDate>
            <Abstract>{shortenedAbstract}</Abstract>
          </View>
          <View>
            <ClipButton
              clipStatus={clipStatus}
              clipped={clipped}
              onPress={onPressClip}
            />
          </View>
        </ContentContainer>
      </TouchableOpacity>
    </Container>
  )
}

export default React.memo(SearchResultEntry, (prev, next) => isAllTrue([
  prev.item.id === next.item.id,
  prev.item.publisher === next.item.publisher,
  prev.item.clipStatus === next.item.clipStatus,
  prev.item.clipped === next.item.clipped,
]));
