import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import filterActions from '@redux/actions/filter';
import { mapActionsToHookMethod } from "@utils/redux";

const selectFilter = (state: ReduxRootState) => state.filter;

const useReduxFilter = () => {
  const filterState = useSelector(selectFilter);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, filterActions)
  return {
    state: filterState,
    methods,
  };
}

export default useReduxFilter;