import Developer from '@screens/Developer';
import ButtonTester from '@screens/Testers/ButtonTester';
import { defineCustomRoute } from '@utils/router';

const routes = {
  ButtonTester: defineCustomRoute({
    devName: "버튼 테스터",
    component: ButtonTester,
    params: undefined,
  }),
}

export default routes;
