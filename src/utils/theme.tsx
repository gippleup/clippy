import { getAllColors, SupportedColorTheme } from "@api/colortheme"
import ColorTheme from "@api/colortheme/schema";
import useReduxTheme from "@hooks/useReduxTheme";
import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components"

type ThemedComponentBaseProp = {
  themeName: SupportedColorTheme;
}

type ComponentThemeDefinition = {
  [T in SupportedColorTheme]: (colorTheme: ColorTheme) => FlattenSimpleInterpolation
}

const colors = getAllColors();

type ThemedComponentDefinition<P = {}> = {
  baseComponent: React.ComponentClass<P> | React.FC<P>;
  commonStyle?: FlattenSimpleInterpolation;
  themeMapper: (colorTheme: ColorTheme) => FlattenSimpleInterpolation;
  themeStyle?: Partial<ComponentThemeDefinition>;
}

const pickRelevantThemeStyle = (theme: SupportedColorTheme, themeStyle?: Partial<ComponentThemeDefinition>) => {
  if (themeStyle === undefined) return null;
  const specifiedStyleMapper = themeStyle[theme]
  if (specifiedStyleMapper === undefined) return null;
  return specifiedStyleMapper(colors[theme])
}

export const defineThemedComponent
  : <P>(definition: ThemedComponentDefinition<P>) => React.FC<P>
  = (definition) => {
  const {baseComponent, commonStyle, themeMapper, themeStyle} = definition;
  
  const ThemedComponent = styled<typeof baseComponent>(baseComponent)<ThemedComponentBaseProp>`
    ${commonStyle};
    ${({themeName}) => {
        const specifiedStyle = pickRelevantThemeStyle(themeName, themeStyle);
        return specifiedStyle || themeMapper(colors[themeName]);
    }};
  `;

  const ProvidedComponent: React.FC<React.ComponentProps<typeof ThemedComponent>> = (props) => {
    const {state} = useReduxTheme();
    return <ThemedComponent {...props} themeName={state.theme} />;
  };
  
  return ProvidedComponent;
}