import { defineCustomRoute } from '@utils/navigation';
import SearchBarTester from '@screens/Tester/SearchBarTester';
import LocalStorageTester from '@screens/Tester/LocalStorageTester';
import RecentQueryApiTester from '@screens/Tester/RecentQueryApiTester';
import SearchResultListTester from '@screens/Tester/SearchResultListTester';
import WebViewTester from '@screens/Tester/WebViewTester';

const routes = {
  SearchBarTester: defineCustomRoute({
    devName: "서치바 테스터",
    component: SearchBarTester,
  }),
  LocalStorageTester: defineCustomRoute({
    devName: "로컬스토리지 테스터",
    component: LocalStorageTester,
  }),
  RecentQueryApiTester: defineCustomRoute({
    devName: "최근 검색어 api 테스터",
    component: RecentQueryApiTester,
  }),
  SearchResultListTester: defineCustomRoute({
    devName: "검색 결과 목록 테스터",
    component: SearchResultListTester,
  }),
  WebViewTester: defineCustomRoute({
    devName: "안녕! 웹뷰 바보똥꾸야!",
    component: WebViewTester,
  })
}

export default routes;
