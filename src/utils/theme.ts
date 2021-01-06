import { getAllColors, SupportedColorTheme } from "@api/colortheme"
import ColorTheme from "@api/colortheme/schema";
import styled, { FlattenSimpleInterpolation } from "styled-components"

type ThemedComponentBaseProp = {
  themeName: SupportedColorTheme;
}

type ComponentThemeDefinition = {
  [T in SupportedColorTheme]: (colorTheme: ColorTheme) => FlattenSimpleInterpolation
}

const colors = getAllColors();

type ThemedComponentDefinition<C extends React.ComponentClass | React.FC> = {
  baseComponent: C;
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


export const defineThemedComponent = <C extends React.ComponentClass | React.FC>(definition: ThemedComponentDefinition<C>) => {
  const {baseComponent, commonStyle, themeMapper, themeStyle} = definition;
  return styled<C>(baseComponent)<ThemedComponentBaseProp>`
    ${commonStyle};
    ${({themeName}) => {
      const specifiedStyle = pickRelevantThemeStyle(themeName, themeStyle);
      return specifiedStyle || themeMapper(colors[themeName]);
    }};
  `;
}