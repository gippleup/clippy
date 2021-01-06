import { defineThemedComponent } from "@utils/theme";
import { Text } from "react-native";
import { css } from "styled-components";

export const ArticleHeadline = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${colors.primary};
  `,
  commonStyle: css`
    font-weight: bold;
    font-size: 20px;
  `,
})