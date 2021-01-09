import { defineThemedComponent } from "@utils/theme";
import { TextInput, TextInputProps, View } from "react-native";
import { css } from "styled-components";
import { getComponentConstant } from '@api/constants';
import chroma from 'chroma-js'
import { getIconSet } from "@api/icons";
import Animated from "react-native-reanimated";
const {SEARCHBAR_HEIGHT, SEARCHBAR_PADDING, SEARCH_INPUT_WIDTH} = getComponentConstant("searchBar");

const BarContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    /* background-color: transparent; */
  `,
  commonStyle: css`
    align-items: center;
    border-radius: 10px;
    height: ${SEARCHBAR_HEIGHT}px;
    flex-direction: row;
    justify-content: center;
  `,
});

const Input = defineThemedComponent<{}, Animated.AnimateProps<{}, TextInputProps>>({
  baseComponent: Animated.createAnimatedComponent(TextInput),
  themeMapper: (colors) => css`
    background-color: ${colors.SEARCHBAR_BACKGROUND};
    border-color: ${colors.SEARCHBAR_BORDER};
    color: ${colors.SEARCHBAR_TEXT};
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
    background-color: ${colors.SEARCHBUTTON_BACKGROUND};
  `,
  commonStyle: css`
    padding: 10px;
    border-radius: 10px;
    margin-left: 10px;
  `,
})


const Icon = defineThemedComponent({
  baseComponent: getIconSet("FontAwesome"),
  themeMapper: (colors) => css`
    color: ${colors.SEARCHBUTTON_ICON};
  `,
  commonStyle: css``,
})

export default {
  BarContainer,
  IconContainer,
  Input,
  Icon,
}