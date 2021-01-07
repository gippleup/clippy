import { getGenericConstant } from "@api/constants"
import { defineThemedComponent } from "@utils/theme"
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native"
import { css } from "styled-components"

const {SCREEN_HEIGHT, SCREEN_WIDTH} = getGenericConstant();

const FloatContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css``,
  commonStyle: css`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 50px;
    position: absolute;
  `,
})

const LoadingStatus = defineThemedComponent({
  baseComponent: ActivityIndicator,
  themeMapper: (colors) => css``,
  commonStyle: css`
    height: 70px;
    width: 70px;
    padding: 20px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10px;
  `
})

export default {
  FloatContainer,
  LoadingStatus,
}