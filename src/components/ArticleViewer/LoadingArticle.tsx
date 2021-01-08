import { defineThemedComponent } from '@utils/theme'
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { css } from 'styled-components'

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.background};  
  `,
  commonStyle: css`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
})

const LoadingArticle = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="black" />
    </Container>
  )
}

export default LoadingArticle
