import { getComponentConstant } from "@api/constants";
import { defineThemedComponent } from "@utils/theme";
import chroma from "chroma-js";
import { css } from "styled-components";
import { View, Text } from "react-native";
import { getIconSet } from "@api/icons";
import Animated from "react-native-reanimated";

const {SEARCH_INPUT_WIDTH} = getComponentConstant("searchBar");

const Container = defineThemedComponent<{}, React.ComponentProps<typeof Animated.View>>({
  baseComponent: Animated.View,
  themeMapper: (colors) => css`
    background-color: ${colors.surface};
    border-color: ${chroma(colors.surface).darken().hex()};
  `,
  commonStyle: css`
    width: ${SEARCH_INPUT_WIDTH}px;
    align-items: center;
    border-width: 1px;
    padding: 5px;
    justify-content: space-between;
    flex-direction: row;
  `,
});

const QueryText = defineThemedComponent({
  baseComponent: Text,
  themeMapper: (colors) => css`
    color: ${colors.secondary};
  `,
  commonStyle: css`
  `,
})

const IconContainer = defineThemedComponent({
  baseComponent: View,
  themeMapper: (colors) => css`
    background-color: ${chroma(colors.background).darken().hex()};
  `,
  commonStyle: css`
    border-radius: 5px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  `,
})

const Icon = defineThemedComponent({
  baseComponent: getIconSet("FontAwesome"),
  themeMapper: (colors) => css`
    color: ${colors.error};
  `,
})

export default {
  Container,
  QueryText,
  IconContainer,
  Icon,
}