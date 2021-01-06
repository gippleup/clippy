import { defineThemedComponent } from "@utils/theme";
import { View } from "react-native";
import { css } from "styled-components";

export const PageContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.background};
  `,
  commonStyle: css`
    height: 100%;
  `,
})