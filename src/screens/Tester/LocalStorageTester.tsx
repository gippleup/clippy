import { FlexHorizontal } from '@styled/FlexHorizontal';
import { getLocalData, setLocalData } from '@utils/storage';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const LocalStorageTester = () => {
  const [key, setKey] = React.useState("some_key");
  const [value, setValue] = React.useState("some_value");
  const [result, setResult] = React.useState("result");
  const onPressSetLocalData = async() => {
    const saveResult = await setLocalData(key, value);
    setResult(String(saveResult));
  }
  const onPressGetLocalData = async() => {
    const loadedData = await getLocalData(key);
    setResult(String(loadedData));
  }
  return (
    <View>
      <View>
        <FlexHorizontal style={styles.inputContainer}>
          <Text style={{fontWeight: "bold"}}>Key: </Text>
          <TextInput style={styles.input} onChangeText={setKey} value={key} />
        </FlexHorizontal>
        <FlexHorizontal style={styles.inputContainer}>
          <Text style={{fontWeight: "bold"}}>Value: </Text>
          <TextInput style={styles.input} onChangeText={setValue} value={value} />
        </FlexHorizontal>
      </View>
      <FlexHorizontal style={styles.resultContainer}>
        <Text style={{fontWeight: "bold"}}>결과값: </Text>
        <Text>{result}</Text>
      </FlexHorizontal>
      <TouchableOpacity style={styles.button} onPress={onPressSetLocalData}>
        <Text>setLocalData</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressGetLocalData}>
        <Text>getLocalData</Text>
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

export default LocalStorageTester
