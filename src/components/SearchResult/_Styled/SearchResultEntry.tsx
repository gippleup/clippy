import { getComponentConstant } from "@api/constants";
import { defineThemedComponent } from "@utils/theme";
import { ImageBackground, Text, View } from "react-native";
import { css } from "styled-components";
import chroma from 'chroma-js'

const {
  SEARCH_RESULT_HEIGHT,
  SEARCH_RESULT_MARGIN_BOTTOM,
  SEARCH_RESULT_WIDTH,
} = getComponentConstant("searchResult");

const Abstract = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${colors.secondary};
  `,
})

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.background};
  `,
  commonStyle: css`
    margin-horizontal: 10px;
    margin-bottom: ${SEARCH_RESULT_MARGIN_BOTTOM};
    border-width: 1px;
    border-radius: 10px;
    overflow: hidden;
    elevation: 5;  
  `,
})

const BackgroundImage = defineThemedComponent({
  baseComponent: ImageBackground,
  themeMapper: (colors) => css`
    width: ${SEARCH_RESULT_WIDTH}px;
    height: ${SEARCH_RESULT_HEIGHT}px;
    padding: 10px;
    justify-content: space-between;
  `,
});

const BackgroundImageCover = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${chroma(colors.surface).alpha(0.5).hex()};
  `,
  commonStyle: css`
    position: absolute;
    width: ${SEARCH_RESULT_WIDTH}px;
    height: ${SEARCH_RESULT_HEIGHT}px;
  `,
})

export default {
  Container,
  BackgroundImage,
  BackgroundImageCover,
  Abstract,
}