import { getComponentConstant } from "@api/constants";
import { defineThemedComponent } from "@utils/theme";
import { Text, View, ViewProps } from "react-native";
import { css } from "styled-components";
import chroma from 'chroma-js';

const {
  CLIPBUTTON_HEIGHT,
  CLIPBUTTON_WIDTH,
} = getComponentConstant("clipButton");

const TextContainer = defineThemedComponent<{clipped: boolean}>({
  baseComponent: View,
  themeMapper: (colors, {clipped}) => css`
    background-color: ${clipped ? chroma(colors.secondary).hex() : chroma(colors.primary).hex()};
  `,
  commonStyle: css`
    width: ${CLIPBUTTON_WIDTH}px;
    height: ${CLIPBUTTON_HEIGHT}px;
    justify-content: center;
    align-items: center;  
    border-radius: 100px;
  `,
});

const ClipText = defineThemedComponent<{clipped: boolean}>({
  baseComponent: Text,
  themeMapper: (colors, {clipped}) => css`
    color: ${clipped ? "white" : "black"};
  `,
  commonStyle: css`
    font-weight: bold;
    font-size: 16px;
  `,
})

export default {
  TextContainer,
  ClipText,
}