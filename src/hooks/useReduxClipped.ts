import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import { ReduxHookMethod } from "./schema";
import clippedActions from '@redux/actions/clipped';

const selectClipped = (state: ReduxRootState) => state.clipped;

const useReduxClipped = () => {
  const clippedState = useSelector(selectClipped);
  const dispatch = useDispatch();
  const methods: ReduxHookMethod<typeof clippedActions> = {
    addTag: (indicator) => dispatch(clippedActions.addTag(indicator)),
    clearTags: (indicator) => dispatch(clippedActions.clearTags(indicator)),
    get: () => dispatch(clippedActions.get()),
    initialize: () => dispatch(clippedActions.initialize()),
    pin: (indicator) => dispatch(clippedActions.pin(indicator)),
    push: (clipped) => dispatch(clippedActions.push(clipped)),
    remove: (indicator) => dispatch(clippedActions.remove(indicator)),
    removeTag: (indicator) => dispatch(clippedActions.removeTag(indicator)),
    set: (clipped) => dispatch(clippedActions.set(clipped)),
    unclip: (indicator) => dispatch(clippedActions.unclip(indicator)),
    unpin: (indicator) => dispatch(clippedActions.unpin(indicator))
  }
  return {
    state: clippedState,
    methods,
  };
}

export default useReduxClipped;