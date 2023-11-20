import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Footer = ({onPress, text}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>      
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    text: {
        color: 'blue',
        fontSize: 15
    }
})