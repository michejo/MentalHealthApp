import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { FIREBASE_DB } from '../FirebaseConfig'
import {ref, set} from 'firebase/database'
import PickerComponent from '../Components/PickerComponent'
import Required from '../Components/Required'
import GadResults from '../Components/GadResults'

const answers = {
    result: [
        {
            answer: 'Not at all',
            id: 0
        },
        {
            answer: 'Several days',
            id: 1

        },
        {
            answer: 'More than half of days',
            id: 2
        },
        {
            answer: 'Nearly every day',
            id: 3
        }

    ]
}

const Gad7 = ({route}) => {
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);
    const [six, setSix] = useState(0);
    const [seven, setSeven] = useState(0);

    const {userId} = route.params

    const handleOne = (itemValue) =>{
        setOne(itemValue)
    }  

    const handleTwo = (itemValue) =>{
        setTwo(itemValue)
    } 
    const handleThree = (itemValue) =>{
        setThree(itemValue)
    } 
    const handleFour = (itemValue) =>{
        setFour(itemValue)
    } 
    const handleFive = (itemValue) =>{
        setFive(itemValue)
    } 
    const handleSix = (itemValue) =>{
        setSix(itemValue)
    } 
    const handleSeven = (itemValue) =>{
        setSeven(itemValue)
    } 

    const sum = one + two + three + four + five + six + seven

    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentDate = date + '' + month + '' + year

    const handlePress = () => {
        set(ref(FIREBASE_DB, 'users/' + userId + '/gad7/'),
        {
            date: currentDate,
            1: one,
            2: two,
            3: three,
            4: four,
            5: five,
            6: six,
            7: seven,
            Gad7: sum         

        })
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.header}>Over the last two weeks, how often have you been bothered by the following problems?</Text>
            <Text style={styles.text}>1. Feeling nervous, anxious, or on edge</Text>
            <PickerComponent selectedValue={one} onChange={handleOne} data={answers.result}/>
            <Text style={styles.text}>2. Not being able to stop or control worrying</Text>
            <PickerComponent selectedValue={two} onChange={handleTwo} data={answers.result}/>
            <Text style={styles.text}>3. Worrying too much about different things</Text>
            <PickerComponent selectedValue={three} onChange={handleThree} data={answers.result}/>
            <Text style={styles.text}>4. Trouble relaxing</Text>
            <PickerComponent selectedValue={four} onChange={handleFour} data={answers.result}/>
            <Text style={styles.text}>5. Being so restless that it is hard to sit still</Text>
            <PickerComponent selectedValue={five} onChange={handleFive} data={answers.result}/>
            <Text style={styles.text}>6. Becoming easily annoyed or irritable</Text>
            <PickerComponent selectedValue={six} onChange={handleSix} data={answers.result}/>
            <Text style={styles.text}>7. Feeling afraid, as if something awful might happen</Text>
            <PickerComponent selectedValue={seven} onChange={handleSeven} data={answers.result}/>      
            <Required name='Save' onPress={handlePress}/>
            <GadResults sum={sum}/>
    </ScrollView>
  )
}

export default Gad7

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d4edf6',
        height: '100%',
        paddingHorizontal: 10
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
    }
})