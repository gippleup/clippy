import { isAllTrue } from '@utils/condition';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import _Styled from './_Styled/RecentQueryEntry';

const {Container, Icon, IconContainer, QueryText} = _Styled;

type RecentQueryEntryProps = {
  text: string;
  onPressEntry: (q: string) => any;
  onPressDelete: (q: string) => any;
}

const RecentQueryEntry = (props: RecentQueryEntryProps) => {
  const {text} = props;
  const onPressDelete = props.onPressDelete.bind(null, text);
  const onPressEntry = props.onPressEntry.bind(null, text);
  return (
    <TouchableOpacity onPress={onPressEntry}>
      <Container>
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

export default React.memo(RecentQueryEntry, (prev, next) => isAllTrue([
  prev.text === next.text,
]))
