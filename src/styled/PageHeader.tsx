import { getGenericConstant } from "@api/constants";
import { defineThemedComponent } from "@utils/theme";
import { Text } from "react-native";
import { css } from "styled-components";

const {PAGE_HEADER_HEIGHT} = getGenericConstant();

export const PageHeader = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    background-color: ${colors.background};
    color: ${colors.primary};
  `,
  commonStyle: css`
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    text-align-vertical: center;
    height: ${PAGE_HEADER_HEIGHT}px;
  `,
})