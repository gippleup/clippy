import localApi from '@api/local';
import { FlexHorizontal } from '@styled/FlexHorizontal';
import { getLocalData, setLocalData } from '@utils/storage';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


const RecentQueryApiTester = () => {
  const [query, setQuery] = React.useState("나는 새로운 검색어다");
  const [result, setResult] = React.useState<string[]>([]);
  const onPressGetRecentQuery = async() => {
    const queries = await localApi.recentQuery.get();    ;
    setResult(queries);
  }
  const onPressInitialize = async() => {
    await localApi.recentQuery.initialize();
    const queries = await localApi.recentQuery.get();
    setResult(queries);
  }
  const onPressPushQuery = async() => {
    await localApi.recentQuery.push(query);
    const queries = await localApi.recentQuery.get();
    setResult(queries);
  }
  const onPressRemoveQuery = async() => {
    await localApi.recentQuery.remove(query);
    const queries = await localApi.recentQuery.get();
    setResult(queries);
  }
  const onPressSetQuery = async() => {
    await localApi.recentQuery.set([query]);
    const queries = await localApi.recentQuery.get();
    setResult(queries);
  }
  return (
    <View>
      <View>
        <FlexHorizontal style={styles.inputContainer}>
          <Text style={{fontWeight: "bold"}}>Query: </Text>
          <TextInput style={styles.input} onChangeText={setQuery} value={query} />
        </FlexHorizontal>
      </View>
      <View style={styles.resultContainer}>
        <Text style={{fontWeight: "bold"}}>결과값</Text>
        <Text style={{fontWeight: "bold"}}>--------------------</Text>
        <View>
          {result.map((text) => <Text key={text}>{text}</Text>)}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressGetRecentQuery}>
        <Text>getRecentQuery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressInitialize}>
        <Text>initialize</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressPushQuery}>
        <Text>pushQuery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressRemoveQuery}>
        <Text>removeQuery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressSetQuery}>
        <Text>setQuery</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  input: {
    backgroundColor: "white",
  },
  resultContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: "mediumseagreen",
    margin: 10,
  }
})

export default RecentQueryApiTester
