import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const Input = ({placeholder, secureTextEntry, onChangeText, value}) => {
  return (
    <>
        <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChangeText} value={value} style={styles.input}/>
    </>
  )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: 'white'
    }
})