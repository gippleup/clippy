import styled, { ThemedStyledFunction } from "styled-components";

export const createStyledWithCustomProps
  = <P, CustomProp extends object>(baseComponent: React.FC<P> | React.ComponentClass<P>) => {
  type StyledFunction = ThemedStyledFunction<React.FC<P> | React.ComponentClass<P, any>, any, CustomProp, never>
  return (...args: Parameters<StyledFunction>) => styled<typeof baseComponent>(baseComponent)<CustomProp>(...args);
}

export type CreateStyledWithCustomProps = typeof createStyledWithCustomProps;
