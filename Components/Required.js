import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Required = ({name, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
        <Text>{name}</Text>
    </Pressable>
  )
}

export default Required

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 10,
        fontSize: 20,
        backgroundColor: '#b2f2c3',
        width: '90%'
    }
})