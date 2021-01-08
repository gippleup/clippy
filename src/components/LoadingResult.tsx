import { useReduxQuery } from '@hooks/reduxHooks';
import { runTiming } from '@utils/reanimated';
import React from 'react'
import Animated, { useValue } from 'react-native-reanimated';
import _Styled from './LoadingResult/_Styled';

const {
  FloatContainer,
  LoadingStatus,
} = _Styled;

const LoadingResult = () => {
  const {state: QueryState} = useReduxQuery();

  const loadingVisible = QueryState.status === "pending";
  const loadingVisibilityAnimation = useValue(loadingVisible ? 1 : 0);
  const translateY = React.useRef(runTiming({
    animatedSwitch: loadingVisibilityAnimation,
    from: 30, to: 0,
  })).current;
  const opacity = React.useRef(runTiming({
    animatedSwitch: loadingVisibilityAnimation,
    from: 0, to: 1,
  })).current;

  React.useEffect(() => {
    loadingVisibilityAnimation.setValue(loadingVisible ? 1 : 0);
  }, [loadingVisible]);

  return (
    <FloatContainer>
      <Animated.View style={{
          transform: [{translateY}],
          opacity,
        }}>
        <LoadingStatus size="large" color="white" />
      </Animated.View>
    </FloatContainer>
  )
}

export default LoadingResult
