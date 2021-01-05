import { getScreenConstant } from '@api/constants';
import useReduxQuery from '@hooks/useReduxQuery';
import useReduxRecentQuery from '@hooks/useReduxRecentQuery'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RecentQueryEntry from './RecentQueryEntry';

const RecentQueryList = () => {
  const {state, methods} = useReduxRecentQuery();
  const {methods: queryMethods} = useReduxQuery();
  const {queries} = state;
  return (
    <View style={styles.columnReverse}>
      {queries.map((q) => {
        const removeQuery = () => methods.remove(q);
        const setToQuery = async () => {
          queryMethods.set(q);
          queryMethods.search();
        }
        return (
          <RecentQueryEntry
            key={q}
            text={q}
            onPressEntry={setToQuery}
            onPressDelete={removeQuery}
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
    paddingLeft: getScreenConstant("main").SEARCHBAR_PADDING,
  }
})

export default RecentQueryList
