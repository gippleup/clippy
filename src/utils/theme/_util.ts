import { getAllColors, SupportedColorTheme } from "@api/colortheme"
import ColorTheme from "@api/colortheme/schema";
import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components"

type ThemedComponentBaseProp = {
  themeName: SupportedColorTheme;
}

type ComponentThemeDefinition = {
  [T in SupportedColorTheme]: (colorTheme: ColorTheme) => FlattenSimpleInterpolation
}

const colors = getAllColors();

type ThemedComponentDefinition<AdditionalProp={}, BaseProp={}> = {
  baseComponent: React.ComponentClass<BaseProp> | React.FC<BaseProp>;
  commonStyle?: FlattenSimpleInterpolation;
  themeMapper: (colorTheme: ColorTheme, props: AdditionalProp) => FlattenSimpleInterpolation;
  themeStyle?: Partial<ComponentThemeDefinition>;
}

type PickAdditionalPropsFromDefinition<T extends ThemedComponentDefinition<any, any>>
  = T extends ThemedComponentDefinition<infer Additional, infer Base>
    ? Additional
    : never;

const pickRelevantThemeStyle = (theme: SupportedColorTheme, themeStyle?: Partial<ComponentThemeDefinition>) => {
  if (themeStyle === undefined) return null;
  const specifiedStyleMapper = themeStyle[theme]
  if (specifiedStyleMapper === undefined) return null;
  return specifiedStyleMapper(colors[theme])
}

const convertToStyled
  = <A={}, P={}>(definition: ThemedComponentDefinition<A, P>) => {
  const {baseComponent, commonStyle, themeMapper, themeStyle} = definition;
  type AdditionalProps = PickAdditionalPropsFromDefinition<typeof definition>;
  const Styled = styled<typeof baseComponent>(baseComponent)<ThemedComponentBaseProp & AdditionalProps>`
    ${commonStyle};
    ${({themeName, ...props}) => {
        const specifiedStyle = pickRelevantThemeStyle(themeName, themeStyle);
        return specifiedStyle || themeMapper(colors[themeName], props as AdditionalProps);
    }};
  
  `
  return Styled;
}

export type {
  ThemedComponentBaseProp,
  ThemedComponentDefinition,
  PickAdditionalPropsFromDefinition,
}

export default {
  convertToStyled,
}