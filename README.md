# 개요
- NY Times API를 활용하여 Infinite Scroll할 수 있는 아티클 뷰어를 만들고 아티클을 클립할 수 있게 하라!
- 보리공책이 없는 관계로 안드로이드를 기반으로 제작하였습니다. IOS는 구동이 될지 안될지...

## 프로젝트 구동 방법
- [NYTimes Developer](http://developer.nytimes.com/)에 접속해서 API_KEY를 발급받아주세요.
- .env파일을 루트 디렉토리에 만듭니다.
```js
//.env
ENV=PRODUCTION // DEV나 PRODUCTION 둘 중 하나의 값을 사용할 수 있습니다.
NYTIMES_API_KEY=XXXXXXXXXXXXXXXXX // 여기에 본인의 API키를 입력해주세요!
```
  - npm run android를 통해 프로젝트를 구동합니다.

## 프로젝트 구성 로직
 - Redux에서 모든 State를 관리하고 Component는 렌더링만을 담당하도록 구성했습니다.
 - Screen은 Class Component로, 이외의 컴포넌트는 Functional Component로 구성했습니다.
## 프로젝트 디렉토리 구조
```js
./src/ //루트 디렉토리
├── api // news API, 로컬 스토리지 API, icon API, contant API 등 redux에서 관리하는 state 이외의 정보들을 담고 있는 것들과 통신하기 위한 로직들을 담고 있습니다.
├── components // 컴포넌트들을 담고 있습니다.
├── hooks // Redux State와 Action을 const {state, methods} = useReduxXXXXX(); 형태로 반환하는 훅들을 담고 있습니다.
├── navigation // 화면별로 Route가 정의되어 있습니다.
│   ├── routes // Development와 Production의 Route가 구분되어 정의되어 있습니다.
├── redux // Redux 로직
│   ├── actions // Action cretor
│   ├── reducers // Reducer
│   ├── schema // Redux State에 사용되는 데이터 중 일정한 구조를 가지고 있는 데이터에 대한 스키마를 담고 있습니다.
│   └── store.ts // Store
├── screens // 화면들이 정의되어 있습니다.
├── styled // 여러 컴포넌트에서 공통적으로 사용하는 Styled Component들을 담고 있습니다.
├── types // d.ts 파일을 담고 있습니다. react-native-config의 type을 정의하기 위해 사용하였습니다.
└── utils // 여러 차례 반복되는 로직들은 각 로직이 사용되는 유형에 맞는 이름으로 저장되어 있습니다.
```
# 중점
## 보기 좋고 쓰기도 좋은 리덕스
  - 이전 프로젝트(Sort.io)를 진행하면서 Redux를 급하게 만들면 어떤 참변이 일어날 수 있는지 잘 경험하였고, 깜끔하게 Redux를 정의하고 사용할 수 있게 신경썼습니다.
  - 이를 위해 reduxjs/toolkit을 적극 활용했고 각 redux스테이트마다 훅을 만들어, 컴포넌트마다 redux를 간편하게 쓸 수 있게 했습니다.
```js
// redux state별로 훅이 준비되어 있습니다.

// hook/reduxHooks.ts
import { createReduxHook } from "@utils/redux";

export const useReduxArticleViewer = createReduxHook("articleViewer");
export const useReduxClipped = createReduxHook("clipped");
export const useReduxFilter = createReduxHook("filter");
export const useReduxQuery = createReduxHook("query");
export const useReduxRecentQuery = createReduxHook("recentQuery");
export const useReduxSearchResult = createReduxHook("searchResult");
export const useReduxTheme = createReduxHook("theme");
```
```js
// useReduxQuery 사용 예제
const {state, methods} = useReduxQuery();
// state는 redux state를 methods는 redux action을 담고 있습니다.
```
## 비주얼적인 컴포넌트는 쉽게 쉽게
  - Color Theme을 쉽게 지원하고 간단한 컴포넌트들을 쉽게 정의할 수 있도록 redux와 styled-component를 사용하여 defineThemedComponent 유틸을 제작헸습니다.

```js
// defineThemedComponent를 사용한 컴포넌트 정의 예제
const SomeComponent = defineThemedComponent<{custom1: boolean, custom2: number, /*...other prop*/}>({
  baseComponent: View,
  themeMapper: (colors, {custom1, custom2, /*...other prop*/}) => css`
  // redux에서 정의한 theme과 custom prop을 기반으로 스타일을 정의합니다.
  `,
  commonStyle: css`
  // theme과 관계없이 공통적으로 사용하는 스타일을 이곳에 정의합니다.
  `,
});

...
<SomeComponent custom1={true} custom2={10} {/*...other prop*/} /> // Type체크됨.
...
```

# 기타
## 별 건 아니지만 그냥 넘어가기는 아까운 디테일
### 깔끔하게 정리된 util
  - 반복 사용되는 대부분의 논리들을 util로 분리했습니다.
### 깜끔하게 정리된 api
  - api로직의 하부로직을 각 api별 폴더에 정리하고, 최상단에 있는 파일들은 단순한 interface를 가지도록 디자인했습니다.
### 깔끔하게 정리된 hooks
  - createReduxHook util을 제작하여 한줄로 redux hook을 제작할 수 있게 했습니다.
```js
type RegisteredActionKeys = keyof typeof ReduxActions;
type ReduxActionCollection = typeof ReduxActions;
export const createReduxHook
  : <K extends RegisteredActionKeys>(stateKey: K) => (() => {state: ReduxRootState[K], methods: ReduxHookMethod<ReduxActionCollection[K]>})
  = (stateKey) => () => {
  const state = useSelector((state: ReduxRootState) => state[stateKey]);
  const dispatch = useDispatch();
  const actions = ReduxActions[stateKey]
  const methods = mapActionsToHookMethod(dispatch, actions);
  return {
    state,
    methods,
  };
}

```

```js
// 예를 들어 redux state에 있는 theme이라는 state를 위한 hook은 아래와 같이 제작할 수 있습니다.
export const useReduxTheme = createReduxHook("theme");

// 만일 action에 미들웨어를 적용하고 싶다면 createReduxHook의 두번째 패러미터로 methodMapping오브젝트를 제공하면 됩니다.
export const useReduxQuery = createReduxHook("query", {
  search: (actionCreator, dispatch) => (...args) => {
    // ...args는 redux action을 정의할 때 넘긴 parameter입니다.
    // 여기에서는 queryState에서 새로운 검색어를 입력하여 검색할 때 이전에 실행중이던 query액션을 abort하는 미들웨어를 부착하고 있습니다.
    queryPromiseManager.abortPrevious();
    runAndRegisterToQueryManager(actionCreator, dispatch)(...args);
  },
  fetchNextPage: runAndRegisterToQueryManager,
  fetchPush: runAndRegisterToQueryManager,
  fetchSet: runAndRegisterToQueryManager,
  refresh: runAndRegisterToQueryManager,
});

// 그리고 이 훅은 이렇게 사용할 수 있습니다.
...Inside Component...
const {state, methods} = useReduxTheme();
...

```

### 깔끔하게 정리된 컴포넌트
- 컴포넌트에서 사용되는 reduxHook은 모두 각 컴포넌트의 최상단에 위치시켜 redux로직을 쉽게 수정할 수 있도록 했습니다.

## 사용한 스택
 - @react-native-async-storage/async-storage: API로 불러온 아티클을 로컬에 저장하기 위해 사용하였습니다.
 - @reduxjs/toolkit: redux로직을 사용할 때 toolkit을 적극 활용하였습니다. 역시 사람은 도구를 만들든 어쨌든 해서 사용해야 합니다.
 - chroma-js: Color theme의 Variant를 구성하기 위해 사용했습니다.
 - moment: 아티클 생성 시간을 표시하기 위해 사용했습니다.
 - react-native-config: DEV모드와 PRODUCTION모드의 구분, 그리고 NYTimes API키를 관리하기 위해 사용했습니다.
 - react-native-reanimated: 컴포넌트 상의 애니메이션(Search 탭 하단의 로딩 애니메이션)을 구성하기 위해 사용했습니다.
 - react-native-screens: enableScreens()메소드를 사용하기 위해 사용했습니다.
 - react-native-vector-icons: 아이콘을 위해 사용했습니다.
 - react-native-webview: 아티클을 인앱 웹뷰로 보여주기 위해 사용했습니다.
 - react-redux: redux를 react 컴포넌트와 연결하기 위해 사용했습니다.
 - redux: redux 짱
 - redux-thunk: 비동기적인 액션을 수행하기 위해 사용했습니다.
 - styled-components: 컴포넌트의 스타일을 관리하기 위해 사용했습니다.
 - @react-navigation/material-top-tabs: 안녕하세요! 메인 탭의 네비게이션을 책임지고 있는 대치리얼입니다!
