import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import recentQueryActions from '@redux/actions/recentQuery';
import { QueryStateStatus } from "@redux/reducers/query";
import { ReduxHookMethod } from "./schema";

const selectRecentQuery = (state: ReduxRootState) => state.recentQuery;

const useReduxRecentQuery = () => {
  const recentQeuryState = useSelector(selectRecentQuery);
  const dispatch = useDispatch();
  const methods: ReduxHookMethod<typeof recentQueryActions> = {
    clear: () => dispatch(recentQueryActions.clear()),
    get: () => dispatch(recentQueryActions.get()),
    push: (query) => dispatch(recentQueryActions.push(query)),
    remove: (query) => dispatch(recentQueryActions.remove(query)),
  }
  return {
    state: recentQeuryState,
    methods,
  };
}

export default useReduxRecentQuery;