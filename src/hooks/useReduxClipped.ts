import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import clippedActions from '@redux/actions/clipped';
import { mapActionsToHookMethod } from '@utils/redux'

const selectClipped = (state: ReduxRootState) => state.clipped;

const useReduxClipped = () => {
  const clippedState = useSelector(selectClipped);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, clippedActions);

  return {
    state: clippedState,
    methods,
  };
}

export default useReduxClipped;