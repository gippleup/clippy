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
    color: ${colors.surface};
  `,
})

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.background};
  `,
  commonStyle: css`
    margin-horizontal: 10px;
    margin-bottom: ${SEARCH_RESULT_MARGIN_BOTTOM}px;
    border-width: 1px;
    border-radius: 10px;
    overflow: hidden;
    elevation: 5;
  `,
})

const ContentContainer = defineThemedComponent({
  baseComponent: ImageBackground,
  themeMapper: (colors) => css`
  `,
  commonStyle: css`
    width: ${SEARCH_RESULT_WIDTH}px;
    height: ${SEARCH_RESULT_HEIGHT}px;
    justify-content: space-between;
    padding: 10px;
  `,
});

const BackgroundImageCover = defineThemedComponent<{clipped: boolean}>({
  baseComponent: View,
  themeMapper: (colors, {clipped}) => css`
    background-color: ${
      chroma(
        chroma(colors.background)
        .set("hsl.l", 1 - chroma(colors.surface).luminance()))
        .alpha(clipped ? 0.8 : 0.5).hex()
    };
  `,
  commonStyle: css`
    position: absolute;
    width: ${SEARCH_RESULT_WIDTH}px;
    height: ${SEARCH_RESULT_HEIGHT}px;
  `,
});

const PubDate = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${chroma(colors.surface).darken().hex()};
  `,
  commonStyle: css``,
})

export default {
  Container,
  ContentContainer,
  BackgroundImageCover,
  Abstract,
  PubDate,
}