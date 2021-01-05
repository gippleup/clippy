import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import searchResultActions from '@redux/actions/searchResult';
import { mapActionsToHookMethod } from "@utils/redux";

const selectSearchResult = (state: ReduxRootState) => state.searchResult;

const useReduxSearchResult = () => {
  const searchResultState = useSelector(selectSearchResult);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, searchResultActions);
  return {
    state: searchResultState,
    methods,
  };
}

export default useReduxSearchResult;