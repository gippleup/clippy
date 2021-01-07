import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import { mapActionsToHookMethod } from "@utils/redux";
import articleViewerActions from '@redux/actions/articleViewer';

const selectArticleViewer = (state: ReduxRootState) => state.articleViewer;

const useReduxArticleViewer = () => {
  const articleViewrState = useSelector(selectArticleViewer);
  const dispatch = useDispatch();
  const methods = mapActionsToHookMethod(dispatch, articleViewerActions)
  return {
    state: articleViewrState,
    methods,
  };
}

export default useReduxArticleViewer;