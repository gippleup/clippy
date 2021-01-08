import React from 'react'
import { View, Text } from 'react-native'
import _Styled from './_Styled/NoClipped';

const {
  Container,
  GuideText,
} = _Styled;

const NoClipped = () => {
  return (
    <Container>
      <GuideText>아이쿠!</GuideText>
      <GuideText>클립한 게 없네</GuideText>
    </Container>
  )
}

export default NoClipped
