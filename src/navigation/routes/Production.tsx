import { SCREEN_HEIGHT } from '@api/constants/generic';
import ArticleViewerScreen from '@screens/ArticleViewerScreen';
import Main from '@screens/Main';
import { defineCustomRoute } from '@utils/navigation';
import { Easing } from 'react-native';

const routes = {
  Main: defineCustomRoute({
    devName: "메인",
    component: Main,
    initialParams: {},
    options: {
      headerShown: false,
    }
  }),
  ArticleViewerScreen: defineCustomRoute({
    devName: "아티클 뷰어",
    component: ArticleViewerScreen,
    initialParams: {},
    options: {
      headerShown: false,
      transitionSpec: {
        open: {
          animation: "spring",
          config: {},
        },
        close: {
          animation: "timing",
          config: {
            duration: 300,
          },
        }
      },
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.5, 1],
          }),
          transform: [
            {scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            })}
          ]
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
    },
  })
}

export default routes;