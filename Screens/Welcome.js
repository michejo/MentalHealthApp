import { StyleSheet, Text, View, Image, StatusBar, Button } from 'react-native'
import {onAuthStateChanged} from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useState, useEffect } from 'react';
import Required from '../Components/Required';

const Welcome = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() =>{
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
          setEmail(user.email)
          setUserId(user.uid)
          }
        )
      }, [])

      const bdi = () => {
        navigation.navigate('BDI', {
          userId: userId
        })
      }

      const basicInformation = () => {
        navigation.navigate('BasicInformation', {
          email: email,
          userId: userId
        })
      }

      const Gad7 = () => {
        navigation.navigate('GAD7', {
          userId: userId
        })
      }

      const Summary = () => {
        navigation.navigate('Summary', {
          userId: userId
        })
      }

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
        <Image style={styles.image} source={require('../assets/images/hearth.jpg')} resizeMode='contain'/>
        <Text style={styles.text}>Here are tests your therapist has asked you to do:</Text>
        <Required onPress={basicInformation} name="Personal Information"/>
        <Required onPress={bdi} name="BDI: Beck's Depression Inventory"/>
        <Required onPress={Gad7} name='GAD-7 anxiety' />
        <Text style={styles.text}>Remember that the tests themselves do not provide a diagnosis</Text>
        <Required onPress={Summary} name='Summary'/>

    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    margin: 10
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 200,
    margin: 20
  }

})