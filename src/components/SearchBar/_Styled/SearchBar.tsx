import { defineThemedComponent } from "@utils/theme";
import { Animated, TextInput, View } from "react-native";
import { css } from "styled-components";
import { getComponentConstant } from '@api/constants';
import chroma from 'chroma-js'
import { getIconSet } from "@api/icons";
const {SEARCHBAR_HEIGHT, SEARCHBAR_PADDING, SEARCH_INPUT_WIDTH} = getComponentConstant("searchBar");

const BarContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.surface};
  `,
  commonStyle: css`
    align-items: center;
    border-radius: 10px;
    /* padding: ${SEARCHBAR_PADDING}px; */
    height: ${SEARCHBAR_HEIGHT}px;
    flex-direction: row;
    justify-content: center;
  `,
});

const Input = defineThemedComponent({
  baseComponent: Animated.createAnimatedComponent(TextInput),
  themeMapper: (colors) => css`
    background-color: ${chroma(colors.surface).darken().hex()};
    border-color: ${colors.background};
  `,
  commonStyle: css`
    width: ${SEARCH_INPUT_WIDTH}px;
    border-radius: 5px;
    border-width: 0.5px;
  `,
})

const IconContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${colors.background};
  `,
  commonStyle: css`
    padding: 10px;
    border-radius: 10px;
  `,
})


const Icon = defineThemedComponent({
  baseComponent: getIconSet("FontAwesome"),
  themeMapper: (colors) => css`
    color: ${colors.primary};
  `,
  commonStyle: css``,
})

export default {
  BarContainer,
  IconContainer,
  Input,
  Icon,
}