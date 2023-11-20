import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Input from '../Components/Input'
import Footer from '../Components/Footer'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Required from '../Components/Required'

const LogIn = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = FIREBASE_AUTH

    const handleLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch(error){
            alert(error.message)
        } 
    }

    const handleRegisterPress = () => {
      navigation.navigate('Register')
    }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please insert your credentials</Text>
      <Input placeholder='Email' value={email} secureTextEntry={false} onChangeText={newEmail => setEmail(newEmail)}/>
      <Input placeholder='Password' value={password} secureTextEntry={true} onChangeText={newPassword => setPassword(newPassword)}/>
      <Required onPress={handleLogin} name='Login'/>
      <Footer onPress={handleRegisterPress} text='If you dont have account click here!'/>
    </View>
  )
}

export default LogIn

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