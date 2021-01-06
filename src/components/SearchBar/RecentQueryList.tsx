import { getComponentConstant, getScreenConstant } from '@api/constants';
import useReduxQuery from '@hooks/useReduxQuery';
import useReduxRecentQuery from '@hooks/useReduxRecentQuery'
import { ReduxRootState } from '@redux/schema';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RecentQueryEntry from './RecentQueryEntry';

type RecentQueryListProps = {
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
  state: ReduxRootState["recentQuery"];
}

const RecentQueryList: React.FC<RecentQueryListProps> = (props) => {
  const {onPressDelete, onPressEntry, state} = props;
  const {queries, visible} = state;
  return (
    <View style={[styles.columnReverse, {opacity: visible ? 1 : 0}]}>
      {queries.map((q) => {
        return (
          <RecentQueryEntry
            key={q}
            text={q}
            onPressEntry={onPressEntry}
            onPressDelete={onPressDelete}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  columnReverse: {
    flexDirection: "column-reverse",
    position: "absolute",
    zIndex: 1,
    paddingLeft: getComponentConstant("searchBar").SEARCHBAR_PADDING,
  },
})

export default RecentQueryList
