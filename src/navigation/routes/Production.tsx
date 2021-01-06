import ArticleViewer, { ArticleViewerParams, ArticleViewrInitialParams } from '@screens/ArticleViewer';
import Main from '@screens/Main';
import { defineCustomRoute } from '@utils/navigation';

const routes = {
  Main: defineCustomRoute({
    devName: "메인",
    component: Main,
    initialParams: {},
    options: {
      headerShown: false,
    }
  }),
  ArticleViewer: defineCustomRoute<ArticleViewerParams>({
    devName: "아티클 뷰어",
    component: ArticleViewer,
    initialParams: ArticleViewrInitialParams,
    options: {headerShown: false}
  })
}

export default routes;