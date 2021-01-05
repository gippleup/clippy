import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import recentQueryActions from '@redux/actions/recentQuery';
import { mapActionsToHookMethod } from "@utils/redux";

const selectRecentQuery = (state: ReduxRootState) => state.recentQuery;

const useReduxRecentQuery = () => {
  const recentQeuryState = useSelector(selectRecentQuery);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, recentQueryActions)
  return {
    state: recentQeuryState,
    methods,
  };
}

export default useReduxRecentQuery;