import { SearchResult } from '@redux/schema/searchResult';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import { isAllTrue } from '@utils/condition';
import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import _Styled from './_Styled/ClipButton'
const {TextContainer, ClipText} = _Styled;

type ClipButtonProps = {
  clipped: boolean;
  clipStatus: SearchResult["clipStatus"];
  onPress: () => any;
}

const ClipButton: React.FC<ClipButtonProps> = (props) => {
  const {onPress, clipped, clipStatus} = props;
  const text = clipped ? "클립됨" : "클립안됨";
  const Content = () => clipStatus === "idle"
    ? <ClipText clipped={clipped}>{text}</ClipText>
    : <ActivityIndicator size="small" color="white" />

  return (
    <FlexHorizontal>
      <TouchableOpacity onPress={onPress}>
        <TextContainer clipped={clipped}>
          <Content />
        </TextContainer>
      </TouchableOpacity>
    </FlexHorizontal>
  )
}

export default React.memo(ClipButton, (prev, next) => isAllTrue([
  prev.clipStatus === next.clipStatus,
  prev.clipped === next.clipped,
]));
