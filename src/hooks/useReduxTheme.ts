import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import themeActions from '@redux/actions/theme';
import { mapActionsToHookMethod } from "@utils/redux";

const selectTheme = (state: ReduxRootState) => state.theme;

const useReduxTheme = () => {
  const searchResultState = useSelector(selectTheme);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, themeActions);
  return {
    state: searchResultState,
    methods,
  };
}

export default useReduxTheme;