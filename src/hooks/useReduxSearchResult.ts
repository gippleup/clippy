import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import searchResultActions from '@redux/actions/searchResult';
import { QueryStateStatus } from "@redux/reducers/query";
import { ReduxHookMethod } from "./schema";

const selectSearchResult = (state: ReduxRootState) => state.searchResult;

const useReduxSearchResult = () => {
  const searchResultState = useSelector(selectSearchResult);
  const dispatch = useDispatch();
  const methods: ReduxHookMethod<typeof searchResultActions> = {
    clip: (indicator) => dispatch(searchResultActions.clip(indicator)),
    push: (searchResult) => dispatch(searchResultActions.push(searchResult)),
    set: (searchResults) => dispatch(searchResultActions.set(searchResults)),
    unclip: (indicator) => dispatch(searchResultActions.unclip(indicator)),
  }
  return {
    state: searchResultState,
    methods,
  };
}

export default useReduxSearchResult;