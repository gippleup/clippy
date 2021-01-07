import { useReduxQuery } from '@hooks/reduxHooks';
import React from 'react'
import Animated, { useValue } from 'react-native-reanimated';
import _Reanimated from './LoadingResult/_Reanimated';
import _Styled from './LoadingResult/_Styled';

const {
  runTiming,
} = _Reanimated;

const {
  FloatContainer,
  LoadingStatus,
} = _Styled;

const LoadingResult = () => {
  const {state: QueryState} = useReduxQuery();

  const loadingVisible = QueryState.status === "pending";
  const loadingVisibilityAnimation = useValue(loadingVisible ? 1 : 0);
  const translateY = React.useRef(runTiming(loadingVisibilityAnimation, 30, 0)).current;
  const opacity = React.useRef(runTiming(loadingVisibilityAnimation, 0, 1)).current;

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
