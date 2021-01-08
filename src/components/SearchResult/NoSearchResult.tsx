import React from 'react'
import { View, Text } from 'react-native'
import _Styled from './_Styled/NoSearchResult'

const {
  Container,
  GuideText
} = _Styled;

const NoSearchResult = () => {
  return (
    <Container>
      <GuideText>헉</GuideText>
      <GuideText>결과가 없네</GuideText>
    </Container>
  )
}

export default NoSearchResult
