import Main from '@screens/Main';
import { defineCustomRoute } from '@utils/navigation';

const routes = {
  Main: defineCustomRoute({
    devName: "메인",
    component: Main,
  })
}

export default routes;