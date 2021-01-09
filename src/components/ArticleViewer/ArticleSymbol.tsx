import { ColorString } from '@api/colortheme/schema'
import { FlexHorizontal } from '@styled/FlexHorizontal'
import { defineThemedComponent } from '@utils/theme'
import React from 'react'
import { View, Text } from 'react-native'
import styled, { css } from 'styled-components'

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
  `,
  commonStyle: css`
    width: 100px;
    height: 130px;
    background-color: lightgray;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  `,
});

const ArticleContentSymbol = defineThemedComponent<{width: number, height: number, color: ColorString}>({
  baseComponent: View,
  themeMapper: (colors, {width, height, color}) => css`
    width: ${width}px;
    height: ${height}px;
    background-color: ${color};
  `,
  commonStyle: css`
    border-radius: 5px;
  `,
});

const Space = styled(View)<{width?: number, height?: number}>`
  width: ${({width}) => width || 0}px;
  height: ${({height}) => height || 0}px;
`

const ArticleSymbol = () => {
  return (
    <Container>
      <FlexHorizontal style={{justifyContent: "space-around", width: "100%", paddingHorizontal: 12, marginBottom: 5}}>
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <Space width={2} />
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <ArticleContentSymbol width={8} height={10} color="grey" />
        <Space width={2} />
        <ArticleContentSymbol width={8} height={10} color="grey" />
      </FlexHorizontal>
      <FlexHorizontal style={{marginBottom: 8}}>
        <ArticleContentSymbol height={40} width={40} color="grey"/>
        <Space width={3} />
        <View style={{justifyContent: "space-between"}}>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
          <ArticleContentSymbol height={2} width={30} color="grey"/>
        </View>
      </FlexHorizontal>
      <FlexHorizontal style={{marginBottom: 8}}>
        <FlexHorizontal style={{marginRight: 3}}>
          <ArticleContentSymbol height={20} width={20} color="grey"/>
          <Space width={3} />
          <View style={{justifyContent: "space-between"}}>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
          </View>
        </FlexHorizontal>
        <FlexHorizontal>
          <ArticleContentSymbol height={20} width={20} color="grey"/>
          <Space width={3} />
          <View style={{justifyContent: "space-between"}}>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
            <ArticleContentSymbol height={2} width={12} color="grey"/>
          </View>
        </FlexHorizontal>
      </FlexHorizontal>
      <FlexHorizontal style={{marginBottom: 3}}>
        <View style={{justifyContent: "space-between"}}>
          <ArticleContentSymbol height={2} width={45} color="grey"/>
          <ArticleContentSymbol height={2} width={45} color="grey"/>
          <ArticleContentSymbol height={2} width={45} color="grey"/>
          <ArticleContentSymbol height={2} width={45} color="grey"/>
          <ArticleContentSymbol height={2} width={45} color="grey"/>
        </View>
        <Space width={3} />
        <ArticleContentSymbol height={20} width={25} color="grey"/>
      </FlexHorizontal>
    </Container>
  )
}

export default ArticleSymbol
