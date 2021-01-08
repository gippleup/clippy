import { getComponentConstant } from '@api/constants';
import { useAnimatedValue } from '@hooks/animatedHooks';
import { animCondition, animSet } from '@utils/animated';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import _Styled from './_Styled/RecentQueryEntry';

const {SEARCH_INPUT_WIDTH, SEARCH_INPUT_MAX_WIDTH} = getComponentConstant("searchBar");
const {Container, Icon, IconContainer, QueryText} = _Styled;

type RecentQueryEntryProps = {
  text: string;
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
  visible: boolean;
}

const RecentQueryEntry = (props: RecentQueryEntryProps) => {
  const {text, visible} = props;
  const onPressDelete = props.onPressDelete.bind(null, text);
  const onPressEntry = props.onPressEntry.bind(null, text);
  const containerAnim = useAnimatedValue(0);
  const width = animCondition(containerAnim, SEARCH_INPUT_WIDTH, SEARCH_INPUT_MAX_WIDTH);
  const opacity = animCondition(containerAnim, 0, 1);
  animSet({anim: containerAnim, to: visible ? 1 : 0, config: {duration: 300, delay: 100}});

  return (
    <TouchableOpacity onPress={onPressEntry}>
      <Container style={{opacity: opacity, width}}>
        <QueryText>{text}</QueryText>
        <TouchableOpacity onPress={onPressDelete}>
          <IconContainer>
            <Icon name="remove" size={16} />
          </IconContainer>
        </TouchableOpacity>
      </Container>
    </TouchableOpacity>
  )
}

export default RecentQueryEntry;
