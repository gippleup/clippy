import { defineCustomRoute } from '@utils/navigation';
import SearchBarTester from '@screens/Tester/SearchBarTester';
import LocalStorageTester from '@screens/Tester/LocalStorageTester';
import RecentQueryApiTester from '@screens/Tester/RecentQueryApiTester';
import SearchResultListTester from '@screens/Tester/SearchResultListTester';

const routes = {
  SearchBarTester: defineCustomRoute({
    devName: "서치바 테스터",
    component: SearchBarTester,
    initialParams: {},
  }),
  LocalStorageTester: defineCustomRoute({
    devName: "로컬스토리지 테스터",
    component: LocalStorageTester,
    initialParams: {},
  }),
  RecentQueryApiTester: defineCustomRoute({
    devName: "최근 검색어 api 테스터",
    component: RecentQueryApiTester,
    initialParams: {},
  }),
  SearchResultListTester: defineCustomRoute({
    devName: "검색 결과 목록 테스터",
    component: SearchResultListTester,
    initialParams: {},
  }),
}

export default routes;
