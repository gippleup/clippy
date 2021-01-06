import * as searchBar from './constants/component/searchBar'
import * as searchResult from './constants/component/searhResult'
import * as searchArticle from './constants/screen/searchArticle'
import * as clipButton from './constants/component/clipButton'
import * as generic from './constants/generic'

const CONSTANTS = {
  component: {
    searchResult,
    searchBar,
    clipButton,
  },
  screen: {
    searchArticle,
  },
  generic,
} as const;

type Constants = typeof CONSTANTS;
type ComponentKey = keyof typeof CONSTANTS["component"];
type ScreenKey = keyof typeof CONSTANTS["screen"];

export const getComponentConstant = <T extends ComponentKey>(componentName: T): Constants["component"][T] => CONSTANTS.component[componentName];
export const getScreenConstant = <T extends ScreenKey>(screenName: T): Constants["screen"][T] => CONSTANTS.screen[screenName];
export const getGenericConstant = (): Constants["generic"] => CONSTANTS.generic;
export const getConstant = () => CONSTANTS;