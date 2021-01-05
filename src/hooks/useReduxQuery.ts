import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import queryActions from '@redux/actions/query';
import { mapActionsToHookMethod } from "@utils/redux";

const selectQuery = (state: ReduxRootState) => state.query;

const useReduxQuery = () => {
  const queryState = useSelector(selectQuery);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, queryActions);
  return {
    state: queryState,
    methods,
  };
}

export default useReduxQuery;