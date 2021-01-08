import { getComponentConstant } from '@api/constants';
import { runTiming } from '@utils/reanimated';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useValue } from 'react-native-reanimated';
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
  const anim = useValue<number>(0);
  const width = React.useRef(runTiming({
    animatedSwitch: anim,
    from: SEARCH_INPUT_WIDTH, to: SEARCH_INPUT_MAX_WIDTH,
  })).current;

  React.useEffect(() => {
    anim.setValue(visible ? 1 : 0);
  }, [visible])

  return (
    <TouchableOpacity onPress={onPressEntry}>
      <Container style={{width}}>
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
