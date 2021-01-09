import { getThemeColors } from '@api/colortheme'
import { useReduxTheme } from '@hooks/reduxHooks'
import { defineThemedComponent } from '@utils/theme'
import chroma from 'chroma-js'
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { css } from 'styled-components'

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.LOADINGARTICLE_BACKGROUND};  
  `,
  commonStyle: css`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
})

const LoadingArticle = () => {
  const {state} = useReduxTheme();
  const colors = getThemeColors(state.theme);
  const {LOADINGARTICLE_CIRCLE} = colors;
  return (
    <Container>
      <ActivityIndicator size="large" color={LOADINGARTICLE_CIRCLE} />
    </Container>
  )
}

export default LoadingArticle
