import { useReduxTheme } from "@hooks/reduxHooks";
import React from "react";
import _util, { ThemedComponentDefinition } from './theme/_util';

const {
  convertToStyled,
} = _util;

export const defineThemedComponent
  : <A={}, P={}>(definition: ThemedComponentDefinition<A, P>) => React.FC<A & P>
  = (definition) => {
  const Styled = convertToStyled(definition);  
  return (props) => {
    const {state} = useReduxTheme();
    return React.createElement(Styled, {...props, themeName: state.theme}, props.children);
  };;
}