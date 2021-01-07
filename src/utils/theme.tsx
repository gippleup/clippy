import useReduxTheme from "@hooks/useReduxTheme";
import React from "react";
import _util, { ThemedComponentDefinition } from './theme/_util';

const {
  convertToStyled,
} = _util;

export const defineThemedComponent
  : <A={}, P={}>(definition: ThemedComponentDefinition<A, P>) => React.FC<A & P>
  = (definition) => {
  const Styled = convertToStyled(definition);
  const ThemedComponent: React.FC<React.ComponentProps<typeof Styled>> = (props) => {
    const {state} = useReduxTheme();
    return <Styled {...props} themeName={state.theme} />;
  };
  
  return ThemedComponent;
}