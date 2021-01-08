import React from "react";
import { Animated } from "react-native";

/**
 * animated value should be provided within range of 0 and 1.
 * 0 inidicates off state, 1 indicates on state.
 */
export function animCondition (anim: Animated.Value, from: number, to: number): Animated.AnimatedInterpolation;
export function animCondition (anim: Animated.Value, from: string, to: string): Animated.AnimatedInterpolation;
export function animCondition (anim: Animated.Value, from: any, to: any) {
  const interpolated = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [from, to],
  });

  const ref = React.useRef(interpolated);
  return ref.current;
}

type AnimSetOption = {
  anim: Animated.Value;
  to: number;
  deps?: React.DependencyList;
  config?: Partial<Omit<Animated.TimingAnimationConfig, "toValue">>;
}
export const animSet = ({anim, to, deps, config}: AnimSetOption) => React.useEffect(() => {
  Animated.timing(anim, {
    toValue: to,
    useNativeDriver: false,
    duration: 300,
    ...config,
  }).start();
}, deps)
