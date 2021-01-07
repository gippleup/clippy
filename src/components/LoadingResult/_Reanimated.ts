import Animated, { Easing, startClock, stopClock } from "react-native-reanimated";

const {Value, cond, Clock, timing, block, set, and, neq, eq} = Animated;

const runTiming = (visible: Animated.Value<number>, onInvisible: number, onVisible: number) => {
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
    cond(and(eq(visible, 1), neq(config.toValue, onVisible)), [
      ...resetAnimation(),
      set(config.toValue, onVisible),
      startClock(clock),
    ]),
    cond(and(eq(visible, 0), neq(config.toValue, onInvisible)), [
      ...resetAnimation(),
      set(config.toValue, onInvisible),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export default {
  runTiming,
}