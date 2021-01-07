import React from 'react';
import { useReduxClipped, useReduxRecentQuery, useReduxFilter, useReduxQuery, useReduxSearchResult } from './reduxHooks';

const useReduxBoot = () => {
  const {methods: clipped} = useReduxClipped();
  const {methods: RecentQuery} = useReduxRecentQuery();
  // const {methods: Filter} = useReduxFilter();
  // const {methods: Query} = useReduxQuery();
  // const {methods: SearchResult} = useReduxSearchResult();

  React.useEffect(() => {
    clipped.get();
    RecentQuery.get();
  }, [])
}

export default useReduxBoot;