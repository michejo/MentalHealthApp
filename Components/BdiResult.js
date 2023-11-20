import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const BdiResult = ({sum}) => {
  if (sum === 0) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Results will be here</Text>
        </View>
    )
  }

  if (sum > 0 && sum < 11) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Result {sum}: These ups and downs are considered normal</Text>
        </View>
    )
  }

  if (sum > 10 && sum < 17) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: Mild mood disturbance</Text>
        </View>
    )
  }
  if(sum > 16 && sum < 21) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: Borderline clinical depression</Text>
        </View>
    )
  }
  if (sum > 20 && sum < 31) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{sum}: Moderate depression</Text>
        </View>
    )
  }
  if (sum > 30 && sum < 41) {
    return (
        <View style={styles.container}>            
            <Text style={styles.text}>{sum}: Severe depression</Text>            
        </View>
    )
  }
  if (sum > 40) {
    return (
        <View style={styles.container}>            
            <Text style={styles.text}>{sum}: Extreme depression</Text>        
        </View>
    )
  }
}

export default BdiResult

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        fontSize: 20,
    }
})