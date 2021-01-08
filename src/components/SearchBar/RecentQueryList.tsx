import { getComponentConstant } from '@api/constants';
import { ReduxRootState } from '@redux/schema';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import RecentQueryEntry from './RecentQueryEntry';

type RecentQueryListProps = {
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
  state: ReduxRootState["recentQuery"];
}

const RecentQueryList: React.FC<RecentQueryListProps> = (props) => {
  const {onPressDelete, onPressEntry, state} = props;
  const {queries, visible} = state;
  const display = visible ? "flex" : "none";
  return (
    <View style={[styles.columnReverse]}>
      <View style={[styles.queryContainer, {display}]}>
        {queries.map((q) => {
          return (
            <RecentQueryEntry
              key={q}
              text={q}
              visible={visible}
              onPressEntry={onPressEntry}
              onPressDelete={onPressDelete}
            />
          )
        })}
      </View>
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

export default RecentQueryList
