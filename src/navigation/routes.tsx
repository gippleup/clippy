import DEV from './routes/Development';
import PRODUCTION from './routes/Production';
import { CustomRouteOption } from '@utils/navigation';

import DevRoute from '@navigation/routes/Development';
import ProRoute from '@navigation/routes/Production';

type ExtractParamListFromRoute<T extends {[index: string]: CustomRouteOption}> = {
  [K in keyof T]: T[K]["initialParams"];
}

export type RootStackParamList =
  ExtractParamListFromRoute<typeof DevRoute>
  & ExtractParamListFromRoute<typeof ProRoute>;

export default {
  DEV: {...DEV, ...PRODUCTION},
  PRODUCTION,
}