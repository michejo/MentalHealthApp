import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GadResults = ({sum}) => {
    if (sum === 0 && sum < 5) {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: minimal anxiety</Text>
        </View>
        )
    }
    if (sum > 4 && sum < 10) {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: mild anxiety</Text>
        </View>
        )
    }
    if (sum > 9 && sum < 15) {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: moderate anxiety</Text>
        </View>
        )
    }
    if (sum > 15) {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: severe anxiety</Text>
        </View>
        )
    }
}

export default GadResults

const styles = StyleSheet.create({
        container: {
        margin: 10,
        padding: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    }
})