import { SupportedColorTheme } from "@api/colortheme"
import styled, { FlattenSimpleInterpolation } from "styled-components"

type ThemedComponentBaseProp = {
  themeName: SupportedColorTheme;
}

type ComponentThemeDefinition = {
  [T in SupportedColorTheme]: FlattenSimpleInterpolation
}

type ThemedComponentDefinition<C extends React.ComponentClass | React.FC> = {
  baseComponent: C;
  commonStyle?: FlattenSimpleInterpolation;
  themeStyle: ComponentThemeDefinition;
}

export const defineThemedComponent = <C extends React.ComponentClass | React.FC>(definition: ThemedComponentDefinition<C>) => {
  const {baseComponent, commonStyle, themeStyle} = definition;
  return styled<C>(baseComponent)<ThemedComponentBaseProp>`
    ${commonStyle};
    ${({themeName}) => themeStyle[themeName]};
  `;
}