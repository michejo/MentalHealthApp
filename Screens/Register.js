import { StyleSheet, Text, View, ScrollView, Button, Pressable} from 'react-native'
import { useState } from 'react'
import React from 'react'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig'

import Input from '../Components/Input'
import Footer from '../Components/Footer'
import Required from '../Components/Required'

const Register = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const auth = FIREBASE_AUTH

    const handleRegister = async() => {

        if (password !== confirmPassword) {

          setEmail('')
          setPassword('')
          setConfirmPassword('')
        
            return (
              alert("Passwords dont match!")   
            )       
        }

        try {
           const res = await createUserWithEmailAndPassword(auth, email, password)       
    
        }
        catch(error) {
            alert(error.message)
        }       
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const handleAccountPress = () => {
        navigation.navigate('LogIn')
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register here</Text>
      <Input placeholder='Email' value={email} secureTextEntry={false} onChangeText={newEmail => setEmail(newEmail)}/>
      <Input placeholder='Password' value={password} secureTextEntry={true} onChangeText={newPassword => setPassword(newPassword)}/>
      <Input placeholder='Confirm Password' value={confirmPassword} secureTextEntry={true} onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}/>
      <Required onPress={handleRegister} name='Register your account'/>
      <Footer onPress={handleAccountPress} text='Already have account click here!'/>     
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4edf6',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    
},
header: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 10
},
})