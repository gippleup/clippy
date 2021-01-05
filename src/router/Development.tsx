import SearchBarTester from '@screens/Tester/SearchBarTester';
import { defineCustomRoute } from '@utils/router';

const routes = {
  SearchBarTester: defineCustomRoute({
    devName: "서치바 테스터",
    component: SearchBarTester,
    params: undefined,
  }),
}

export default routes;
