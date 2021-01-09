import { getThemeColors } from '@api/colortheme'
import { useReduxTheme } from '@hooks/reduxHooks'
import { defineThemedComponent } from '@utils/theme'
import chroma from 'chroma-js'
import React from 'react'
import { View, Animated, Easing, Text } from 'react-native'
import styled, { css } from 'styled-components'
import ArticleSymbol from './ArticleSymbol'

const ArticleSymbolCount = 1;

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
  const loadingAnim = React.useRef(new Animated.Value(0)).current;
  const bottomAnim = React.useRef(new Animated.Value(0)).current;
  const bottomArticleScale = bottomAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1, 0.8],
  });
  const bottomArticleOpacity = bottomAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 0.9, 0.7],
  })

  const translateY = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, -20],
  });
  const opacity = loadingAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 0.5, 1, 0.5, 0],
  });
  const scale = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1.5, 0.8],
  })


  React.useEffect(() => {
    const floatAnimation = Animated.loop(Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }));

    const bottomAnimation = Animated.loop(Animated.timing(bottomAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }));

    Animated.parallel([
      floatAnimation,
      bottomAnimation,
    ]).start();
  }, [])

  return (
    <Container>
      <Animated.View style={{
        opacity: bottomArticleOpacity,
        transform: [{scale: bottomArticleScale}]
      }}>
        <ArticleSymbol/>
      </Animated.View>
      <View
        style={{position: "absolute"}}>
        <Animated.View
          style={{
            opacity,
            transform: [
              {translateY},
              {scale}
          ]}}
        >
          <ArticleSymbol/>
        </Animated.View>
      </View>
    </Container>
  )
}

export default LoadingArticle
