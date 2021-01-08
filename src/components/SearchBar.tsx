import { getComponentConstant } from '@api/constants';
import { useAnimatedValue } from '@hooks/animatedHooks';
import { useReduxRecentQuery, useReduxQuery } from '@hooks/reduxHooks';
import { animCondition, animSet } from '@utils/animated';
import React from 'react'
import { TouchableOpacity, StyleSheet, View, Keyboard, Animated } from 'react-native'
import RecentQueryList from './SearchBar/RecentQueryList';
import _Styled from './SearchBar/_Styled/SearchBar';
const {BarContainer, IconContainer, Input, Icon} = _Styled;
const {SEARCH_INPUT_WIDTH, SEARCH_INPUT_MAX_WIDTH} = getComponentConstant("searchBar");

const SearchBar = () => {
  const {methods: RecentQueryMethods, state: RecentQueryState} = useReduxRecentQuery();
  const {methods: QueryMethods, state: QueryState} = useReduxQuery();
  const {value} = QueryState;
  const inputAnim = useAnimatedValue(0);
  const inputWidth = animCondition(inputAnim, SEARCH_INPUT_WIDTH, SEARCH_INPUT_MAX_WIDTH);
  animSet({anim: inputAnim, to: QueryState.typing ? 1 : 0, deps: [QueryState.typing]});

  const onFocusInput = QueryMethods.setTyping.bind(null, true);
  const onBlurInput = QueryMethods.setTyping.bind(null, false);
  const onChangeText = (text: string) => QueryMethods.set(text);
  const onPressSearchIcon = QueryMethods.search;
  const onKeyboardHide = () => {
    RecentQueryMethods.setVisiblity(false);
    QueryMethods.setTyping(false);
  }
  const onKeyboardShow = () => {
    RecentQueryMethods.setVisiblity(true);
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
