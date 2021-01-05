import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import queryActions from '@redux/actions/query';
import { QueryStateStatus } from "@redux/reducers/query";
import { ReduxHookMethod } from "./schema";

const selectQuery = (state: ReduxRootState) => state.query;

const useReduxQuery = () => {
  const queryState = useSelector(selectQuery);
  const dispatch = useDispatch();
  const methods: ReduxHookMethod<typeof queryActions> = {
    set: (q: string) => dispatch(queryActions.set(q)),
    clear: () => dispatch(queryActions.clear()),
    fetchNextPage: () => dispatch(queryActions.fetchNextPage()),
    search: () => dispatch(queryActions.search()),
    setPage: (page: number) => dispatch(queryActions.setPage(page)),
    setStatus: (status: QueryStateStatus) => dispatch(queryActions.setStatus(status)),
  }
  return {
    state: queryState,
    methods,
  };
}

export default useReduxQuery;