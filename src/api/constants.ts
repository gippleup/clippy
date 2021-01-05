import { Dimensions } from "react-native";

const {width, height} = Dimensions.get("screen");
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

const SEARCH_INPUT_WIDTH = SCREEN_WIDTH - 100;
const SEARCHBAR_PADDING = 5;

const SEARCH_RESULT_WIDTH = Math.min(SCREEN_WIDTH - 20, 720);
const SEARCH_RESULT_HEIGHT = SEARCH_RESULT_WIDTH * (9 / 16);

const CONSTANTS = {
  component: {
    searchResult: {
      SEARCH_RESULT_WIDTH,
      SEARCH_RESULT_HEIGHT,
    },
    searchBar: {
      SEARCH_INPUT_WIDTH,
      SEARCHBAR_PADDING,
    }
  },
  screen: {
    main: {
      SEARCH_INPUT_WIDTH,
      SEARCHBAR_PADDING,
    }
  }
} as const;

type Constants = typeof CONSTANTS;
type ComponentKey = keyof typeof CONSTANTS["component"];
type ScreenKey = keyof typeof CONSTANTS["screen"];
export const getComponentConstant = <T extends ComponentKey>(componentName: T): Constants["component"][T] => CONSTANTS.component[componentName];
export const getScreenConstant = <T extends ScreenKey>(screenName: T): Constants["screen"][T] => CONSTANTS.screen[screenName];
export const getConstant = () => CONSTANTS;