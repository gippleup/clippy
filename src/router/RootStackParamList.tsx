import { CustomRouteOption } from '@utils/router';
import DevRoute from './Development';
import ProRoute from './Production';

type ExtractParamListFromRoute<T extends {[index: string]: CustomRouteOption}> = {
  [K in keyof T]: T[K]["params"] | undefined;
}

export type RootStackParamList =
  ExtractParamListFromRoute<typeof DevRoute>
  & ExtractParamListFromRoute<typeof ProRoute>;
