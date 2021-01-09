import { defineThemedComponent } from "@utils/theme";
import { Text } from "react-native";
import { css } from "styled-components";

export const ArticleHeadline = defineThemedComponent<{clipped: boolean}>({
  baseComponent: Text,
  themeMapper: (colors, {clipped}) => css`
    color: ${clipped ? colors.ARTICLE_HEADER_CLIPPED : colors.ARTICLE_HEADER_NOT_CLIPPED};
  `,
  commonStyle: css`
    font-weight: bold;
    font-size: 20px;
  `,
})