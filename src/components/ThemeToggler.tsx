import { getIconSet } from '@api/icons';
import { useReduxQuery, useReduxTheme } from '@hooks/reduxHooks'
import { defineThemedComponent } from '@utils/theme';
import React from 'react'
import { View, Text, Switch } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';
import Animated, { useValue } from 'react-native-reanimated';
import { runTiming } from '@utils/reanimated';

const IconContainer = defineThemedComponent({
  baseComponent: Animated.View,
  themeMapper: (colors) => css`
    background-color: ${chroma(colors.background).luminance() > 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"};
  `,
  commonStyle: css`
    border-radius: 20px;
    height: 40px;
    width: 60px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
})

const Icon = defineThemedComponent({
  baseComponent: getIconSet("FontAwesome"),
  themeMapper: (colors) => css`
    background-color: ${chroma(colors.background).luminance() > 0.5 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
  `,
  commonStyle: css`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    text-align: center;
    text-align-vertical: center;
  `,
})

const ThemeToggler = () => {
  const {state: QueryState} = useReduxQuery();
  const {state, methods} = useReduxTheme();
  const nextValue = state.theme === "dark" ? "light" : "dark";
  const iconName = state.theme === "dark" ? "moon-o" : "sun-o";
  const color = state.theme === "dark" ? "purple" : "orange";
  const onPress = () => methods.set(nextValue);
  const display = QueryState.typing ? "none" : "flex";
  const themeSwitch = useValue<number>(0);
  const querySwitch = useValue<number>(0);
  const opacity = React.useRef(runTiming({
    animatedSwitch: querySwitch,
    from: 0, to: 1,
  })).current;

  const translateX = React.useRef(runTiming({
    animatedSwitch: themeSwitch,
    from: 0, to: 20,
  })).current;

  React.useEffect(() => {
    themeSwitch.setValue(state.theme === "dark" ? 0 : 1);
    querySwitch.setValue(QueryState.typing ? 0 : 1);
  }, [state.theme, QueryState.typing])

  return (
    <View style={{position: "absolute", right: 20}}>
      <TouchableOpacity style={{display}} onPress={onPress}>
        <IconContainer style={{opacity}}>
          <Animated.View style={{transform: [{translateX}]}}>
            <Icon name={iconName} color={color} size={30} />
          </Animated.View>
        </IconContainer>
      </TouchableOpacity>
    </View>
  )
}

export default ThemeToggler
