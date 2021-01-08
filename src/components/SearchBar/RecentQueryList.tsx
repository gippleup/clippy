import { ReduxRootState } from '@redux/schema';
import { isAllTrue } from '@utils/condition';
import { runTiming } from '@utils/reanimated';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { useValue } from 'react-native-reanimated';
import { shallowEqual } from 'react-redux';
import RecentQueryEntry from './RecentQueryEntry';

type RecentQueryListProps = {
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
  state: ReduxRootState["recentQuery"];
}

const RecentQueryList: React.FC<RecentQueryListProps> = (props) => {
  const {onPressDelete, onPressEntry, state} = props;
  const {queries, visible} = state;
  const anim = useValue<number>(0);
  const opacity = React.useRef(runTiming({
    animatedSwitch: anim,
    from: 0, to: 1,
  })).current;

  console.log(visible);
  React.useEffect(() => {
    anim.setValue(visible ? 1 : 0)
  })

  return (
    <View style={[styles.columnReverse]}>
      <Animated.View style={[styles.queryContainer, {opacity}]}>
        {queries.map((q) => {
          return (
            <RecentQueryEntry
              key={q}
              text={q}
              onPressEntry={onPressEntry}
              onPressDelete={onPressDelete}
              visible={visible}
            />
          )
        })}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  columnReverse: {
    position: "absolute",
    zIndex: 1,
  },
  queryContainer: {
    flexDirection: "column-reverse",
  }
})

export default React.memo(RecentQueryList, (prev, next) => isAllTrue([
  prev.state.visible === next.state.visible,
  shallowEqual(prev.state.queries, next.state.queries),
]))
