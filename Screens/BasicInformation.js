import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Input from '../Components/Input'
import { FIREBASE_DB } from '../FirebaseConfig'
import {ref, set} from 'firebase/database'
import Required from '../Components/Required'

const BasicInformation = ({route, navigation}) => {

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [dob,setDOB] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')

    const {email, userId} = route.params

    const handlePress = () => {
        set(ref(FIREBASE_DB, 'users/' + userId + '/personalinformation'),
        {
            email: email,
            fName: fName,
            lName: lName,
            dob: dob,
            address: address,
            city: city

        })
    }
    

  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set up your personal information:</Text>
      <Input placeholder='First name' value={fName} secureTextEntry={false} onChangeText={newFName => setFName(newFName)}/>
      <Input placeholder='Last name' value={lName} secureTextEntry={false} onChangeText={newLName => setLName(newLName)}/>
      <Input placeholder='Date of Birth' value={dob} secureTextEntry={false} onChangeText={newDob => setDOB(newDob)}/>
      <Input placeholder='Address' value={address} secureTextEntry={false} onChangeText={newAddress => setAddress(newAddress)}/>
      <Input placeholder='City' value={city} secureTextEntry={false} onChangeText={newCity => setCity(newCity)}/>
      <Required onPress={handlePress} name='Save'/>
      <Image style={styles.image} source={require('../assets/images/info.png')}/>
    </View>
  )
}

export default BasicInformation

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4edf6',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250,
    margin: 20,
    borderRadius: 200
  }
})