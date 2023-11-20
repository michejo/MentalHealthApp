import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_DB } from '../FirebaseConfig'
import {ref, onValue} from 'firebase/database'
import { useState, useEffect } from 'react'
import BdiResult from '../Components/BdiResult'
import GadResults from '../Components/GadResults'


const Summary = ({route}) => {
    const [bdi, setBdi] = useState('')
    const [gad, setGad] = useState('')
    const [name, setName] = useState('')


    const {userId} = route.params

    useEffect(() => {
        const bdiResult = ref(FIREBASE_DB, 'users/' + userId + '/bdi');
        onValue(bdiResult, (snapshot) => {
            const data = snapshot.val();
            setBdi(data.bdi)
            });

        const gadResult = ref(FIREBASE_DB, 'users/' + userId + '/gad7');
        onValue(gadResult, (snapshot) => {
            const data = snapshot.val();
            setGad(data.Gad7)
        })

        const name = ref(FIREBASE_DB, 'users/' + userId + '/personalinformation');
        onValue(name, (snapshot) => {
            const data = snapshot.val();
            setName(data.fName)
            });

            
    }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}'s summary</Text>
      <Text style={styles.text}>BDI: Beck's Depression Inventory:</Text>
      <BdiResult sum={bdi}/>
      <Text style={styles.text}>GAD-7 anxiety:</Text>
      <GadResults sum={gad} />
      <Text style={styles.warning}>Remember that the tests themselves do not provide a diagnosis</Text>
    </View>
  )
}

export default Summary

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d4edf6',
        height: '100%',
        padding: 10,
        justifyContent: 'center'
      },
    header: {
        fontSize: 25,
        padding: 15,
        marginBottom: 10
    },
    text: {
        fontSize: 25,
        color: '#14a5f8'
    },
    warning: {
        color: 'red'
    }
})