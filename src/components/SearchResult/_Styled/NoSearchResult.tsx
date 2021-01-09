import { defineThemedComponent } from "@utils/theme";
import { Text, View } from "react-native";
import { css } from "styled-components";
import chroma from 'chroma-js'

const Container = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.NORESULT_BACKGROUND};
  `,
  commonStyle: css`
    flex: 1;
    margin: 20px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `,
})

const GuideText = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${colors.NORESULT_TEXT};
  `,
  commonStyle: css`
    font-size: 30px;
    text-align: center;
  `,
})

export default {
  Container,
  GuideText,
}