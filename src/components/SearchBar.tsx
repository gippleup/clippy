import { getComponentConstant } from '@api/constants';
import { useReduxRecentQuery, useReduxQuery } from '@hooks/reduxHooks';
import { runTiming } from '@utils/reanimated';
import React from 'react'
import { TouchableOpacity, StyleSheet, View, Keyboard } from 'react-native'
import { useValue, cond, eq, call } from 'react-native-reanimated';
import RecentQueryList from './SearchBar/RecentQueryList';
import _Styled from './SearchBar/_Styled/SearchBar';
const {BarContainer, IconContainer, Input, Icon} = _Styled;
const {SEARCH_INPUT_WIDTH, SEARCH_INPUT_MAX_WIDTH} = getComponentConstant("searchBar");

let some = 0;
const SearchBar = () => {
  const {methods: RecentQueryMethods, state: RecentQueryState} = useReduxRecentQuery();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const {value} = QueryState;
  const inputAnim = useValue<number>(0);
  const inputWidth = React.useRef(runTiming({
    animatedSwitch: inputAnim,
    from: SEARCH_INPUT_WIDTH, to: SEARCH_INPUT_MAX_WIDTH,
    onFinish: (args) => {
      const [switchValue] = args;
      if (switchValue === 1) RecentQueryMethods.setVisiblity(true);
    }
  })).current;

  React.useEffect(() => {
    inputAnim.setValue(QueryState.typing ? 1 : 0);
  }, [QueryState.typing])
  
  const onFocusInput = QueryMethods.setTyping.bind(null, true);
  const onBlurInput = QueryMethods.setTyping.bind(null, false);
  const onChangeText = (text: string) => {
    QueryMethods.setTyping(true);
    QueryMethods.set(text);
  }
  const onPressSearchIcon = QueryMethods.search;
  const onKeyboardHide = () => {
    RecentQueryMethods.setVisiblity(false);
    QueryMethods.setTyping(false);
  }
  const onKeyboardShow = () => {
    QueryMethods.setTyping(true);
  }
  const onPressDeleteRecentQuery = (q: string) => RecentQueryMethods.remove(q);
  const onPressRecentQueryEntry = (q: string) => {
    QueryMethods.set(q);
    QueryMethods.search();
  }

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidHide", onKeyboardHide);
    Keyboard.addListener("keyboardDidShow", onKeyboardShow);
    return () => {
      Keyboard.removeListener("keyboardDidHide", onKeyboardHide);
      Keyboard.removeListener("keyboardDidShow", onKeyboardShow);
    }
  })

  return (
    <View style={styles.alignCenter}>
      <View style={styles.alignLeft}>
        <BarContainer>
          <Input
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            style={{width: inputWidth}}
          />
          <TouchableOpacity onPress={onPressSearchIcon}>
            <IconContainer>
              <Icon name="search" size={20} />
            </IconContainer>
          </TouchableOpacity>
        </BarContainer>
        <View>
          <RecentQueryList
            onPressDelete={onPressDeleteRecentQuery}
            onPressEntry={onPressRecentQueryEntry}
            state={RecentQueryState}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: "center",
  },
  alignLeft: {
    alignItems: "flex-start",
  },
})

export default SearchBar
