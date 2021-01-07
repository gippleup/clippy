import React, { CSSProperties } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconPack = {
  FontAwesome,
}

type IconOption = {
  name: string;
  size: number;
  color: CSSProperties["color"];
}

export const getIconSet = (pack: keyof typeof IconPack) => IconPack[pack]

export const getIcon = (pack: keyof typeof IconPack, option: Partial<IconOption>) => {
  const {color = "red", name = "heart", size = 30} = option;
  const Icon = IconPack[pack]
  return <Icon color={color} name={name} size={size} />;
}