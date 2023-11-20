import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker'


const PickerComponent = ({selectedValue, onChange, data}) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onChange} mode={'dropdown'} style={styles.input} numberOfLines={5}>
        {data.map((i) => {
           return( <Picker.Item key={i.id} label={i.answer} value={i.id}/>)
        })}
    </Picker>
  )
}

export default PickerComponent

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: "90%",
        padding: 10,
        margin: 10
    }
})