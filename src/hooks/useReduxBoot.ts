import React from 'react';
import useReduxClipped from "./useReduxClipped";
import useReduxFilter from "./useReduxFilter";
import useReduxQuery from "./useReduxQuery";
import useReduxRecentQuery from "./useReduxRecentQuery";
import useReduxSearchResult from "./useReduxSearchResult";

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