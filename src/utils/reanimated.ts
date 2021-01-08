import Animated, { Easing, startClock, stopClock } from "react-native-reanimated";

const {
  Value, cond, Clock, timing,
  block, set, and, neq, eq, call,
} = Animated;

type RunTimingParams = {
  animatedSwitch: Animated.Value<number>;
  from: number;
  to: number;
  onFinish?: (animatedSwitch: readonly number[]) => void;
}
export const runTiming = ({animatedSwitch, from, to, onFinish}: RunTimingParams) => {
  const clock = new Clock();
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(-1),
    duration: new Value(300),
    easing: Easing.inOut(Easing.ease),
  };

  const resetAnimation = () => [
    set(state.finished, 0),
    set(state.frameTime, 0),
    set(state.time, 0),
  ]

  return block([
    cond(and(eq(animatedSwitch, 1), neq(config.toValue, to)), [
      ...resetAnimation(),
      set(config.toValue, to),
      startClock(clock),
    ]),
    cond(and(eq(animatedSwitch, 0), neq(config.toValue, from)), [
      ...resetAnimation(),
      set(config.toValue, from),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      onFinish ? call([animatedSwitch], onFinish) : [],
      stopClock(clock),
    ]),
    state.position,
  ])
}
